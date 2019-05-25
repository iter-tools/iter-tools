import { ensureAsyncIterable, isAsyncIterable, asyncIterableCurry, asyncify } from '../async-iterable'
import { range, asyncToArray } from '../..'

describe('ensureAsyncIterable', () => {
  it('transform sync iter to async', async () => {
    const iter = ensureAsyncIterable(range({ start: 1, end: 4 }))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: undefined, done: true })
  })
})

describe('isAsyncIterable', () => {
  it('works', () => {
    expect(isAsyncIterable(range(3))).toBe(false)
    expect(isAsyncIterable([])).toBe(false)
    expect(isAsyncIterable(null)).toBe(false)
    expect(isAsyncIterable(asyncify([]))).toBe(true)
  })
})

class Hello {}
class Goodbye {}
class World {}

const hello = new Hello()
const goodbye = new Goodbye()
const world = new World()

async function * iter (...args) {
  yield * args
}

async function add (initial, iterable) {
  let result = initial
  for await (const number of iterable) {
    result += number
  }
  return result
}

async function addAll (initial, iterables) {
  let result = initial
  for (const iterable of iterables) {
    for await (const number of iterable) {
      result += number
    }
  }
  return result
}

describe('asyncIterableCurry', () => {
  const f2 = (a, b, iterable) => iter(a, b)
  const f1 = (a, iterable) => iter(a)
  const f0 = (iterable) => iter()
  const c2 = asyncIterableCurry(f2)
  const c1 = asyncIterableCurry(f1)
  const c0 = asyncIterableCurry(f0)

  it('curries', async () => {
    expect(await asyncToArray(c2(hello, world, []))).toEqual([hello, world])
    expect(await asyncToArray(c2(hello, world)([]))).toEqual([hello, world])
    expect(await asyncToArray(c2(hello)(world, []))).toEqual([hello, world])
    expect(await asyncToArray(c2(hello)(world)([]))).toEqual([hello, world])
    expect(await asyncToArray(c1(hello, []))).toEqual([hello])
    expect(await asyncToArray(c1(hello)([]))).toEqual([hello])
    expect(await asyncToArray(c0([]))).toEqual([])
  })

  it('curries with empty invocations', async () => {
    expect(await asyncToArray(c2()(hello)(world)([]))).toEqual([hello, world])
    expect(await asyncToArray(c2(hello)()(world)([]))).toEqual([hello, world])
    expect(await asyncToArray(c2(hello)(world)()([]))).toEqual([hello, world])
    expect(await asyncToArray(c1()(hello)()([]))).toEqual([hello])
    expect(await asyncToArray(c0()()([]))).toEqual([])
  })

  it('throws with too many args', () => {
    expect(() => c2(hello)(goodbye)(world)([])).toThrowError(new Error('f2 takes up to 2 arguments, followed by asyncIterable. You already passed 3 arguments and the last argument was not asyncIterable'))
    expect(() => c1(hello)(world)([])).toThrowError(new Error('f1 takes up to 1 arguments, followed by asyncIterable. You already passed 2 arguments and the last argument was not asyncIterable'))
    expect(() => c0(hello)([])).toThrowError(new Error('f0 takes up to 0 arguments, followed by asyncIterable. You already passed 1 arguments and the last argument was not asyncIterable'))
  })

  describe('when passed explicit arity', () => {
    const f = (a = goodbye, b = world, c) => iter(a, b)
    const c = asyncIterableCurry(f, { minArgs: 0, maxArgs: 2 })

    it('curries', async () => {
      expect(await asyncToArray(c(hello)(world)([]))).toEqual([hello, world])
      expect(await asyncToArray(c(hello)([]))).toEqual([hello, world])
      expect(await asyncToArray(c([]))).toEqual([goodbye, world])
    })

    it('curries with empty invocations', async () => {
      expect(await asyncToArray(c()(hello)(world)([]))).toEqual([hello, world])
      expect(await asyncToArray(c()()(hello)([]))).toEqual([hello, world])
      expect(await asyncToArray(c()()()([]))).toEqual([goodbye, world])
    })

    it('throws with too many args', () => {
      expect(() => c(hello)(goodbye)(world)([])).toThrowError(new Error('f takes up to 2 arguments, followed by asyncIterable. You already passed 3 arguments and the last argument was not asyncIterable'))
    })
  })

  describe('works with reducing functions', () => {
    const f2 = (a, b, iterable) => add(a + b, iterable)
    const f1 = (a, iterable) => add(a, iterable)
    const f0 = (iterable) => add(0, iterable)
    const c2 = asyncIterableCurry(f2, { reduces: true })
    const c1 = asyncIterableCurry(f1, { reduces: true })
    const c0 = asyncIterableCurry(f0, { reduces: true })

    it('curries', async () => {
      expect(await c2(1)(2)([4])).toBe(7)
      expect(await c1(1)([2])).toBe(3)
      expect(await c0([1])).toBe(1)
    })

    it('curries with empty invocations', async () => {
      expect(await c2()(1, 2, [4])).toBe(7)
      expect(await c2(1, 2)()([4])).toBe(7)
      expect(await c2(1)()(2, [4])).toBe(7)
      expect(await c2(1)()(2)()([4])).toBe(7)
      expect(await c1(1)()([2])).toBe(3)
      expect(await c0()([1])).toBe(1)
    })

    it('throws with too many args', () => {
      expect(() => c2(1)(2)(3)([])).toThrowError(new Error('f2 takes up to 2 arguments, followed by asyncIterable. You already passed 3 arguments and the last argument was not asyncIterable'))
      expect(() => c1(1)(2)([])).toThrowError(new Error('f1 takes up to 1 arguments, followed by asyncIterable. You already passed 2 arguments and the last argument was not asyncIterable'))
      expect(() => c0(1)([])).toThrowError(new Error('f0 takes up to 0 arguments, followed by asyncIterable. You already passed 1 arguments and the last argument was not asyncIterable'))
    })
  })

  describe('works with variadic functions', () => {
    const f1 = (a, ...iterables) => addAll(a, ...iterables)
    const c1 = asyncIterableCurry(f1, { variadic: true, reduces: true })

    it('curries', async () => {
      expect(await c1(1)([2, 4], [8, 16])).toBe(31)
      expect(await c1(1)([2, 4])).toBe(7)
    })

    it('curries with empty invocations', async () => {
      expect(await c1(1)()([2, 4])).toBe(7)
    })

    it('throws with too many args', () => {
      const expectedError = 'f1 takes up to 1 arguments, followed by ...asyncIterables. You already passed 2 arguments and the following arguments were not all asyncIterables'
      expect(() => c1(1)(2)([4, 8])).toThrow(expectedError)
    })
  })
})
