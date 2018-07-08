/* eslint-env node, jest */
const { chain, asyncChain, asyncToArray, range } = require('iter-tools')

describe('chain', function () {
  it('chains iterables', function () {
    const iter = chain([range({ start: 1, end: 4 }), [4, 5, 6]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('asyncChain', function () {
  it('chains iterables', async function () {
    const iter = asyncChain([range({ start: 1, end: 3 }), [3, 4]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4])
  })
})
