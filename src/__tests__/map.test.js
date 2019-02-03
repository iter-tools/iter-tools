/* eslint-env node, jest */
const { map, asyncMap, asyncToArray, range } = require('..')

describe('map', function () {
  it('returns mapped iterable', function () {
    const iter = map((item) => item * 2, [1, 2, 3])
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('returns mapped iterable from iterable', function () {
    const iter = map((item) => item * 2, range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('returns mapped iterable (curried version)', function () {
    const iter = map((item) => item * 2)
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
  })

  it('returns empty iterable from null', function () {
    expect(Array.from(map((item) => item * 2, null))).toEqual([])
  })
})

describe('asyncMap', function () {
  it('returns mapped iterable', async function () {
    const iter = asyncMap((item) => item * 2, [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns mapped iterable (using a promise)', async function () {
    const iter = asyncMap((item) => Promise.resolve(item * 2), [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns mapped iterable from iterable', async function () {
    const iter = asyncMap((item) => item * 2, range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('maps concurrently', async function () {
    const iter = asyncMap(2, (item) => item * 2, range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns mapped iterable (curried version)', async function () {
    const iter = asyncMap((item) => item * 2)
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
  })

  it('returns empty iterable from null', async function () {
    expect(await asyncToArray(asyncMap((item) => item * 2, null))).toEqual([])
  })
})
