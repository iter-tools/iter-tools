/* eslint-env node, jest */
const { zipAll, asyncZipAll, asyncToArray, range } = require('..')

const { slice } = require('..')

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
})
