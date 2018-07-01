/* eslint-env node, jest */
const { takeWhile, asyncTakeWhile, asyncIterToArray, range } = require('iter-tools')

describe('takeWhile', function () {
  it('takeWhile on array', function () {
    const iter = takeWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
    expect(Array.from(iter)).toEqual([2, 2])
  })

  it('takeWhile on iterable', function () {
    const iter = takeWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
    expect(Array.from(iter)).toEqual([1, 2, 3])
  })

  it('takeWhile on iterable (curried version)', function () {
    const iter = takeWhile(function (item) { return item !== 4 })
    expect(Array.from(iter(range({ start: 1, end: 7 })))).toEqual([1, 2, 3])
  })
})

describe('asyncTakeWhile', function () {
  it('takeWhile on array', async function () {
    const iter = asyncTakeWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
    expect(await asyncIterToArray(iter)).toEqual([2, 2])
  })

  it('takeWhile on iterable', async function () {
    const iter = asyncTakeWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
    expect(await asyncIterToArray(iter)).toEqual([1, 2, 3])
  })

  it('takeWhile on iterable (curried version)', async function () {
    const iter = asyncTakeWhile(function (item) { return item !== 4 })
    expect(await asyncIterToArray(iter(range({ start: 1, end: 7 })))).toEqual([1, 2, 3])
  })
})
