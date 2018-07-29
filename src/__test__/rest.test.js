/* eslint-env node, jest */
const { rest, asyncRest, range, asyncToArray } = require('iter-tools')

describe('rest', function () {
  it('return first item', function () {
    const a = rest(range(10))
    expect(Array.from(a)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})

describe('asyncRest', function () {
  it('return first item', async function () {
    const a = await asyncRest(range(10))
    expect(await asyncToArray(a)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})
