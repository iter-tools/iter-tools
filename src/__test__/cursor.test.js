/* eslint-env node, jest */
const { cursor, asyncCursor, asyncToArray } = require('iter-tools')

describe('cursor', function () {
  it('frames iterable', function () {
    const iter = cursor(3, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, undefined, 1],
      [undefined, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })
})

describe('asyncCursor', function () {
  it('frames iterable', async function () {
    const iter = asyncCursor(3, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [undefined, undefined, 1],
      [undefined, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })
})
