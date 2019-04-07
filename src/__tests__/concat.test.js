/* eslint-env node, jest */
const { concat, asyncConcat, asyncToArray, range } = require('..')

describe('concat', function () {
  it('concats iterables', function () {
    const iter = concat(range({ start: 1, end: 4 }), [4, 5, 6])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('asyncConcat', function () {
  it('concats iterables', async function () {
    const iter = asyncConcat(range({ start: 1, end: 3 }), [3, 4])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4])
  })
})
