/* eslint-env node, jest */
const { dropWhile, asyncDropWhile, asyncToArray, range } = require('..')

describe('dropWhile', function () {
  it('dropWhile on array', function () {
    const iter = dropWhile((item) => item % 2 === 0, [2, 2, 3, 2, 2, 2])
    expect(Array.from(iter)).toEqual([3, 2, 2, 2])
  })

  it('dropWhile on iterable', function () {
    const iter = dropWhile((item) => item !== 4, range({ start: 1, end: 7 }))
    expect(Array.from(iter)).toEqual([4, 5, 6])
  })

  it('dropWhile on iterable (curried version)', function () {
    const iter = dropWhile((item) => item !== 4)
    expect(Array.from(iter(range({ start: 1, end: 7 })))).toEqual([4, 5, 6])
  })

  it('dropWhile on null', function () {
    expect(Array.from(dropWhile((item) => item, null))).toEqual([])
  })
})

describe('asyncDropWhile', function () {
  it('dropWhile on array', async function () {
    const iter = asyncDropWhile((item) => item % 2 === 0, [2, 2, 3, 2, 2, 2])
    expect(await asyncToArray(iter)).toEqual([3, 2, 2, 2])
  })

  it('dropWhile on iterable', async function () {
    const iter = asyncDropWhile((item) => item !== 4, range({ start: 1, end: 7 }))
    expect(await asyncToArray(iter)).toEqual([4, 5, 6])
  })

  it('dropWhile on iterable (using a promise)', async function () {
    const iter = asyncDropWhile((item) => Promise.resolve(item !== 4), range({ start: 1, end: 7 }))
    expect(await asyncToArray(iter)).toEqual([4, 5, 6])
  })

  it('dropWhile on iterable (curried version)', async function () {
    const iter = asyncDropWhile((item) => item !== 4)
    expect(await asyncToArray(iter(range({ start: 1, end: 7 })))).toEqual([4, 5, 6])
  })

  it('dropWhile on null', async function () {
    expect(await asyncToArray(asyncDropWhile((item) => item, null))).toEqual([])
  })
})
