/* eslint-env node, jest */
const { filter, asyncFilter, asyncIterToArray, range } = require('iter-tools')

describe('filter', function () {
  it('return filtered iterable', function () {
    const iter = filter(function (item) { return item % 2 === 0 }, [1, 2, 3, 4, 5, 6])
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('return filtered iterable from iterable', function () {
    const iter = filter(function (item) { return item % 2 === 0 }, range({ start: 1, end: 7 }))
    expect(Array.from(iter)).toEqual([2, 4, 6])
  })

  it('return filtered iterable (curried version)', function () {
    const iter = filter(function (item) { return item % 2 === 0 })
    expect(Array.from(iter(range({ start: 1, end: 7 })))).toEqual([2, 4, 6])
  })
})

describe('asyncFilter', function () {
  it('return filtered iterable', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 }, [1, 2, 3, 4, 5, 6])
    expect(await asyncIterToArray(iter)).toEqual([2, 4, 6])
  })

  it('return filtered iterable from iterable', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 }, range({ start: 1, end: 7 }))
    expect(await asyncIterToArray(iter)).toEqual([2, 4, 6])
  })

  it('return filtered iterable (curried version)', async function () {
    const iter = asyncFilter(function (item) { return item % 2 === 0 })
    expect(await asyncIterToArray(iter(range({ start: 1, end: 7 })))).toEqual([2, 4, 6])
  })
})
