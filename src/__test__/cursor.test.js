/* eslint-env node, jest */
const { cursor, asyncCursor, asyncToArray } = require('iter-tools')

describe('cursor', function () {
  it('frames iterable', function () {
    const iter = cursor(3, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (cursor equal to the sequence)', function () {
    const iter = cursor(5, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [1, 2, 3, 4, 5]
    ])
  })

  it.only('frames iterable (cursor bigger than the sequence)', function () {
    const iter = cursor(6, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, 1, 2, 3, 4, 5]
    ])
  })
})

describe('asyncCursor', function () {
  it('frames iterable', async function () {
    const iter = asyncCursor(3, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (cursor equal to the sequence)', async function () {
    const iter = asyncCursor(5, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [1, 2, 3, 4, 5]
    ])
  })

  it.only('frames iterable (cursor bigger than the sequence)', async function () {
    const iter = asyncCursor(6, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [undefined, 1, 2, 3, 4, 5]
    ])
  })
})
