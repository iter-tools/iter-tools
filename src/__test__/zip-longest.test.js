/* eslint-env node, jest */
const { zipLongest, asyncZipLongest, asyncIterToArray, range } = require('iter-tools')

describe('zipLongest', function () {
  it('zips', function () {
    const iter = zipLongest('x', [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', function () {
    const iter = zipLongest('x', [range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9]])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zip stopping early', function () {
    const iter = zipLongest('x', [range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8]])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 'x', 'x']])
  })
})

describe('asyncZipLongest', function () {
  it('zips', async function () {
    const iter = asyncZipLongest('x', [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', async function () {
    const iter = asyncZipLongest('x', [range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9]])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zip stopping early', async function () {
    const iter = asyncZipLongest('x', [range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8]])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 'x', 'x']])
  })
})
