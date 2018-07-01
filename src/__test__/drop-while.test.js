/* eslint-env node, jest */
const { dropWhile, asyncDropWhile, asyncIterToArray, range } = require('iter-tools')

describe('dropWhile', function () {
  it('dropWhile on array', function () {
    const iter = dropWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
    expect(Array.from(iter)).toEqual([3, 2, 2, 2])
  })

  it('dropWhile on iterable', function () {
    const iter = dropWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
    expect(Array.from(iter)).toEqual([4, 5, 6])
  })

  it('dropWhile on iterable (curried version)', function () {
    const iter = dropWhile(function (item) { return item !== 4 })
    expect(Array.from(iter(range({ start: 1, end: 7 })))).toEqual([4, 5, 6])
  })
})

describe('asyncDropWhile', function () {
  it('dropWhile on array', async function () {
    const iter = asyncDropWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
    expect(await asyncIterToArray(iter)).toEqual([3, 2, 2, 2])
  })

  it('dropWhile on iterable', async function () {
    const iter = asyncDropWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
    expect(await asyncIterToArray(iter)).toEqual([4, 5, 6])
  })

  it('dropWhile on iterable (curried version)', async function () {
    const iter = asyncDropWhile(function (item) { return item !== 4 })
    expect(await asyncIterToArray(iter(range({ start: 1, end: 7 })))).toEqual([4, 5, 6])
  })
})
