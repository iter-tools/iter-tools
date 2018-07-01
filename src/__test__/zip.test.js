/* eslint-env node, jest */
const { zip, asyncZip, asyncIterToArray, range } = require('iter-tools')

describe('zip', function () {
  it('zips', function () {
    const iter = zip([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', function () {
    const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips stopping early', function () {
    const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8]])
  })
})

describe('asyncZip', function () {
  it('zips', async function () {
    const iter = asyncZip([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', async function () {
    const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips stopping early', async function () {
    const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
    expect(await asyncIterToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8]])
  })
})
