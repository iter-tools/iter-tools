/* eslint-env node, jest */
const { compress, asyncCompress, asyncToArray, asyncIter, range } = require('iter-tools')

describe('compress', function () {
  it('compress iterables', function () {
    const iter = compress(range(10), [0, 1, 0, 1, 1])
    expect(Array.from(iter)).toEqual([1, 3, 4])
  })
})

describe('asyncCompress', function () {
  it('compress iterables', async function () {
    const iter = asyncCompress(asyncIter(range(10)), [0, 1, 0, 1, 1])
    expect(await asyncToArray(iter)).toEqual([1, 3, 4])
  })
})
