/* eslint-env node, jest */
const { filter, asyncFilter, asyncToArray, range } = require('iter-tools')

describe('filter', function () {
  it('returns filtered iterable', function () {
    const iter = filter(function (item) { return item % 2 === 0 }, [1, 2, 3, 4, 5, 6])
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('returns filtered iterable from iterable', function () {
    const iter = filter(function (item) { return item % 2 === 0 }, range({ start: 1, end: 7 }))
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('returns filtered iterable (curried version)', function () {
    const iter = filter(function (item) { return item % 2 === 0 })
    expect(Array.from(iter(range({ start: 1, end: 7 })))).toEqual([2, 4, 6])
  })

  it('returns empty iterable from null', function () {
    expect(Array.from(filter((item) => item, null))).toEqual([])
  })
})

describe('asyncFilter', function () {
  it('returns filtered iterable', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 }, [1, 2, 3, 4, 5, 6])
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns filtered iterable (using a promise)', async function () {
    const iter = asyncFilter(function (item) { return Promise.resolve(item % 2 === 0) }, [1, 2, 3, 4, 5, 6])
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns filtered iterable from iterable', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 }, range({ start: 1, end: 7 }))
    expect(await asyncToArray(iter)).toEqual([2, 4, 6])
  })

  it('returns filtered iterable (curried version)', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 })
    expect(await asyncToArray(iter(range({ start: 1, end: 7 })))).toEqual([2, 4, 6])
  })

  it('returns empty iterable from null', async function () {
    expect(await asyncToArray(asyncFilter((item) => item, null))).toEqual([])
  })
})
