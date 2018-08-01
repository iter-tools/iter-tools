/* eslint-env node, jest */
const { batch, asyncBatch, asyncToArray, range } = require('iter-tools')

describe('batch', function () {
  it('returns an iterable with batches', function () {
    const iter = batch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an iterable with batches when passed an iterable', function () {
    const iter = batch(2, range({ start: 1, end: 10 }))
    expect(Array.from(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an iterable with batches when passed an iterable (2)', function () {
    const iter = batch(2, range({ start: 1, end: 9 }))
    expect(Array.from(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]])
  })

  it('returns an iterable with batches (curried version)', function () {
    const iter = batch(2)
    expect(Array.from(iter(range({ start: 1, end: 10 })))).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an empty iterable when passed null', function () {
    expect(Array.from(batch(2, null))).toEqual([])
  })
})

describe('asyncBatch', function () {
  it('returns an async iterable with batches', async function () {
    const iter = asyncBatch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(await asyncToArray(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an async iterable with batches when passed an iterable', async function () {
    const iter = asyncBatch(2, range({ start: 1, end: 10 }))
    expect(await asyncToArray(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an async iterable with batches when passed an iterable (2)', async function () {
    const iter = asyncBatch(2, range({ start: 1, end: 9 }))
    expect(await asyncToArray(iter)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]])
  })

  it('returns an async iterable with batches (curried version)', async function () {
    const iter = asyncBatch(2)
    expect(await asyncToArray(iter(range({ start: 1, end: 10 })))).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })

  it('returns an empty iterable when passed null', async function () {
    expect(await asyncToArray(asyncBatch(2, null))).toEqual([])
  })
})
