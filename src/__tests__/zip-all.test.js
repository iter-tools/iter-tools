/* eslint-env node, jest */
const { zipAll, asyncZipAll, asyncToArray, range } = require('..')
const { slice } = require('..')
const { OneTwoThreeIterable, AsyncOneTwoThreeIterable } = require('../internal/test-fixtures')

describe('zipAll', function () {
  it('zips', function () {
    const iter = zipAll([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', function () {
    const iter = zipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zip stopping early', function () {
    const iter = zipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, undefined, undefined]])
  })

  it('closes when stopping earlier', function () { // broken if transpiled with es5 loose
    const repeatX = {
      [Symbol.iterator] () { return this },
      next: () => ({ done: false, value: 'x' }),
      return: jest.fn(() => ({ done: true }))
    }

    const iter = slice(2, zipAll(range(2), repeatX))
    expect(Array.from(iter)).toEqual([[0, 'x'], [1, 'x']])
    expect(repeatX.return).toBeCalled()
  })

  it('cleans up the iterables', function () {
    const first = new OneTwoThreeIterable()
    const second = new OneTwoThreeIterable()

    const iter = zipAll(first, second)
    expect(Array.from(iter)).toEqual([[1, 1], [2, 2], [3, 3]])
    expect(first).toHaveProperty('isCleanedUp', true)
    expect(second).toHaveProperty('isCleanedUp', true)
  })
})

describe('asyncZipAll', function () {
  it('zips', async function () {
    const iter = asyncZipAll([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', async function () {
    const iter = asyncZipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zip stopping early', async function () {
    const iter = asyncZipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, undefined, undefined]])
  })

  it('cleans up the iterables', async function () {
    const first = new AsyncOneTwoThreeIterable()
    const second = new AsyncOneTwoThreeIterable()

    const iter = asyncZipAll(first, second)
    expect(await asyncToArray(iter)).toEqual([[1, 1], [2, 2], [3, 3]])
    expect(first).toHaveProperty('isCleanedUp', true)
    expect(second).toHaveProperty('isCleanedUp', true)
  })
})
