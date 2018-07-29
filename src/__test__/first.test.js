/* eslint-env node, jest */
const { first, asyncFirst, range } = require('iter-tools')

describe('first', function () {
  it('return first item', function () {
    const iter = range(10)
    const a = first(iter)
    expect(a).toBe(0)
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})

describe('asyncFirst', function () {
  it('return first item', async function () {
    const a = await asyncFirst(range(10))
    expect(a).toBe(0)
  })
})
