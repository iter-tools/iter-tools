/* eslint-env node, jest */
const { iterable, asyncIterable, range, asyncToArray } = require('..')

describe('iterable', function () {
  it('works with iterators', function () {
    let value = 0
    const iterator = {
      next: () => ++value <= 3 ? {value} : {done: true}
    }
    expect(Array.from(iterable(iterator))).toEqual([1, 2, 3])
  })

  it('works withiterables', function () {
    const i = iterable([0, 1, 2])
    expect(Array.from(i)).toEqual([0, 1, 2])
  })

  it('works with null', function () {
    const i = iterable(null)
    expect(Array.from(i)).toEqual([])
  })

  it('throws with Objects', function () {
    expect(() => {
      iterable({'1': 1, '2': 2})
    }).toThrow()
  })
})

describe('asyncIterable', function () {
  it('works with async iterators', async function () {
    let value = 0
    const iterator = {
      next: () => Promise.resolve(++value <= 3 ? {value} : {done: true})
    }
    expect(await asyncToArray(asyncIterable(iterator))).toEqual([1, 2, 3])
  })

  it('works with sync iterators', async function () {
    let value = 0
    const iterator = {
      next: () => ++value <= 3 ? {value} : {done: true}
    }
    expect(await asyncToArray(asyncIterable(iterator))).toEqual([1, 2, 3])
  })

  it('works with null', async function () {
    const i = asyncIterable(null)
    expect(await asyncToArray(i)).toEqual([])
  })

  it('transforms a sync iterable to an async iterable', async function () {
    const iterable = asyncIterable([true])
    const asyncIterator = iterable[Symbol.asyncIterator]()

    const { value } = await asyncIterator.next()
    expect(value).toBe(true)
    const { done } = await asyncIterator.next()
    expect(done).toBe(true)
  })

  it('works with async iterables', async function () {
    const i = asyncIterable(asyncIterable(range({ start: 1, end: 4 })))
    expect(await asyncToArray(i)).toEqual([1, 2, 3])
  })
})
