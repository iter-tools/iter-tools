/* eslint-env node, jest */
const { ensureIterable, isIterable, iterableCurry } = require('../iterable')
const { range, toArray } = require('../..')

describe('ensureIterable', function () {
  it('works with iterables', function () {
    const i = range(3)
    expect(i).toBe(ensureIterable(i))
    expect(Array.from(ensureIterable(i))).toEqual([0, 1, 2])
  })
  it('works with Symbol.iterator', function () {
    const i = ensureIterable([0, 1, 2])
    expect(Array.from(i)).toEqual([0, 1, 2])
  })
  it('works with null', function () {
    const i = ensureIterable(null)
    expect(Array.from(i)).toEqual([])
  })
})

describe('isIterable', function () {
  it('works', function () {
    expect(isIterable(range(3))).toBe(true)
    expect(isIterable([])).toBe(true)
    expect(isIterable(null)).toBe(false)
  })
})

class Hello {}
class Goodbye {}
class World {}

const hello = new Hello()
const goodbye = new Goodbye()
const world = new World()

function * iter (...args) {
  yield * args
}

function add (initial, iterable) {
  let result = initial
  for (const number of iterable) {
    result += number
  }
  return result
}

function addAll (initial, iterables) {
  let result = initial
  for (const iterable of iterables) {
    for (const number of iterable) {
      result += number
    }
  }
  return result
}

describe('iterableCurry', function () {
  const f2 = (a, b, iterable) => iter(a, b)
  const f1 = (a, iterable) => iter(a)
  const f0 = (iterable) => iter()
  const c2 = iterableCurry(f2)
  const c1 = iterableCurry(f1)
  const c0 = iterableCurry(f0)

  it('curries', function () {
    expect(toArray(c2(hello, world, []))).toEqual([hello, world])
    expect(toArray(c2(hello, world)([]))).toEqual([hello, world])
    expect(toArray(c2(hello)(world, []))).toEqual([hello, world])
    expect(toArray(c2(hello)(world)([]))).toEqual([hello, world])
    expect(toArray(c1(hello, []))).toEqual([hello])
    expect(toArray(c1(hello)([]))).toEqual([hello])
    expect(toArray(c0([]))).toEqual([])
  })

  it('curries with empty invocations', function () {
    expect(toArray(c2()(hello)(world)([]))).toEqual([hello, world])
    expect(toArray(c2(hello)()(world)([]))).toEqual([hello, world])
    expect(toArray(c2(hello)(world)()([]))).toEqual([hello, world])
    expect(toArray(c1()(hello)()([]))).toEqual([hello])
    expect(toArray(c0()()([]))).toEqual([])
  })

  it('throws with too many args', function () {
    expect(() => c2(hello)(goodbye)(world)([])).toThrowError(new Error('f2 takes up to 2 arguments, followed by iterable. You already passed 3 arguments and the last argument was not iterable'))
    expect(() => c1(hello)(world)([])).toThrowError(new Error('f1 takes up to 1 arguments, followed by iterable. You already passed 2 arguments and the last argument was not iterable'))
    expect(() => c0(hello)([])).toThrowError(new Error('f0 takes up to 0 arguments, followed by iterable. You already passed 1 arguments and the last argument was not iterable'))
  })

  describe('when passed explicit arity', function () {
    const f = (a = goodbye, b = world, c) => iter(a, b)
    const c = iterableCurry(f, undefined, 0, 2)

    it('curries', function () {
      expect(toArray(c(hello)(world)([]))).toEqual([hello, world])
      expect(toArray(c(hello)([]))).toEqual([hello, world])
      expect(toArray(c([]))).toEqual([goodbye, world])
    })

    it('curries with empty invocations', function () {
      expect(toArray(c()(hello)(world)([]))).toEqual([hello, world])
      expect(toArray(c()()(hello)([]))).toEqual([hello, world])
      expect(toArray(c()()()([]))).toEqual([goodbye, world])
    })

    it('throws with too many args', function () {
      expect(() => c(hello)(goodbye)(world)([])).toThrowError(new Error('f takes up to 2 arguments, followed by iterable. You already passed 3 arguments and the last argument was not iterable'))
    })
  })

  describe('works with reducing functions', function () {
    const f2 = (a, b, iterable) => add(a + b, iterable)
    const f1 = (a, iterable) => add(a, iterable)
    const f0 = (iterable) => add(0, iterable)
    const c2 = iterableCurry(f2, {reduces: true})
    const c1 = iterableCurry(f1, {reduces: true})
    const c0 = iterableCurry(f0, {reduces: true})

    it('curries', function () {
      expect(c2(1)(2)([4])).toBe(7)
      expect(c1(1)([2])).toBe(3)
      expect(c0([1])).toBe(1)
    })

    it('curries with empty invocations', function () {
      expect(c2()(1, 2, [4])).toBe(7)
      expect(c2(1, 2)()([4])).toBe(7)
      expect(c2(1)()(2, [4])).toBe(7)
      expect(c2(1)()(2)()([4])).toBe(7)
      expect(c1(1)()([2])).toBe(3)
      expect(c0()([1])).toBe(1)
    })

    it('throws with too many args', function () {
      expect(() => c2(1)(2)(3)([])).toThrowError(new Error('f2 takes up to 2 arguments, followed by iterable. You already passed 3 arguments and the last argument was not iterable'))
      expect(() => c1(1)(2)([])).toThrowError(new Error('f1 takes up to 1 arguments, followed by iterable. You already passed 2 arguments and the last argument was not iterable'))
      expect(() => c0(1)([])).toThrowError(new Error('f0 takes up to 0 arguments, followed by iterable. You already passed 1 arguments and the last argument was not iterable'))
    })
  })

  describe('works with variadic functions', function () {
    const f1 = (a, ...iterables) => addAll(a, ...iterables)
    const c1 = iterableCurry(f1, {variadic: true, reduces: true})

    it('curries', function () {
      expect(c1(1)([2, 4], [8, 16])).toBe(31)
      expect(c1(1)([2, 4])).toBe(7)
    })

    it('curries with empty invocations', function () {
      expect(c1(1)()([2, 4])).toBe(7)
    })

    it('throws with too many args', function () {
      const expectedError = 'f1 takes up to 1 arguments, followed by ...iterables. You already passed 2 arguments and the following arguments were not all iterables'
      expect(() => c1(1)(2)([4, 8])).toThrow(expectedError)
    })
  })
})
