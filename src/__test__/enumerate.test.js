/* eslint-env node, jest */
const { enumerate, asyncEnumerate, asyncIterToArray, range } = require('iter-tools')

describe('enumerate', function () {
  it('enumerates iterables', function () {
    const iter = enumerate(range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([[0, 1], [1, 2], [2, 3]])
  })
  it('enumerates iterables with start', function () {
    const iter = enumerate(range({ start: 1, end: 4 }), 3)
    expect(Array.from(iter)).toEqual([[3, 1], [4, 2], [5, 3]])
  })
})

describe('asyncEnumerate', function () {
  it('enumerates iterables', async function () {
    const iter = asyncEnumerate(range({ start: 1, end: 4 }))
    expect(await asyncIterToArray(iter)).toEqual([[0, 1], [1, 2], [2, 3]])
  })
  it('enumerates iterables with start', async function () {
    const iter = asyncEnumerate(range({ start: 1, end: 4 }), 3)
    expect(await asyncIterToArray(iter)).toEqual([[3, 1], [4, 2], [5, 3]])
  })
})
