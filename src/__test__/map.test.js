/* eslint-env node, jest */
const { map, asyncMap, asyncIterToArray, range } = require('iter-tools')

describe('map', function () {
  it('return mapped iterable', function () {
    const iter = map(function (item) { return item * 2 }, [1, 2, 3])
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('return mapped iterable from iterable', function () {
    const iter = map(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('return mapped iterable (curried version)', function () {
    const iter = map(function (item) { return item * 2 })
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
  })
})

describe('asyncMap', function () {
    it('return mapped iterable', async function () {
      const iter = asyncMap(function (item) { return item * 2 }, [1, 2, 3])
      expect(await asyncIterToArray(iter)).toEqual([2, 4, 6])
    })

    it('return mapped iterable from iterable', async function () {
      const iter = asyncMap(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
      expect(await asyncIterToArray(iter)).toEqual([2, 4, 6])
    })

    it('return mapped iterable (curried version)', async function () {
      const iter = asyncMap(function (item) { return item * 2 })
      expect(await asyncIterToArray(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
    })
})
