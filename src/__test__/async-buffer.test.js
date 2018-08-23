/* eslint-env node, jest */
const { asyncBuffer, asyncToArray, range } = require('iter-tools')

describe('asyncBuffer', function () {
  it('buffer', async function () {
    const iter = asyncBuffer(2, range(7))
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('buffer using curry', async function () {
    const iter = asyncBuffer(2)(range(7))
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('buffer (bigger then iterable)', async function () {
    const iter = asyncBuffer(10, range(7))
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })
})
