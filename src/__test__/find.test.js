/* eslint-env node, jest */
const { find, asyncFind, asyncIterToArray, range } = require('iter-tools')

describe('find', function () {
  it('return found item', function () {
    const found = find(function (item) { return item === 5 }, [1, 2, 3, 4, 5, 6])
    expect(found).toBe(5)
  });

  it('return null if no item found', function () {
    const found = find(function (item) { return item === 100 }, [1, 2, 3, 4, 5, 6])
    expect(found).toBe(null)
  });

  it('return found item from iterable', function () {
    const found = find(function (item) { return item === 5 }, range({ start: 1, end: 7 }))
    expect(found).toBe(5)
  })

  it('return null if no item found from iterable', function () {
    const found = find(function (item) { return item === 100 }, range({ start: 1, end: 7 }))
    expect(found).toBe(null)
  })

  it('return filtered iterable (curried version)', function () {
    const findFive = find(function (item) { return item === 5 })
    expect(findFive(range({ start: 1, end: 7 }))).toBe(5)
  })
})

describe('asyncFind', function () {
  it('return found item', async function () {
    const found = asyncFind(function (item) { return item === 5 }, [1, 2, 3, 4, 5, 6])
    expect(await found).toBe(5)
  });

  it('return null if no item found', async function () {
    const found = asyncFind(function (item) { return item === 100 }, [1, 2, 3, 4, 5, 6])
    expect(await found).toBe(null)
  });

  it('return found item from iterable', async function () {
    const found = asyncFind(function (item) { return item === 5 }, range({ start: 1, end: 7 }))
    expect(await found).toBe(5)
  })

  it('return null if no item found from iterable', async function () {
    const found = asyncFind(function (item) { return item === 100 }, range({ start: 1, end: 7 }))
    expect(await found).toBe(null)
  })

  it('return filtered iterable (curried version)', async function () {
    const findFive = asyncFind(function (item) { return item === 5 })
    expect(await findFive(range({ start: 1, end: 7 }))).toBe(5)
  })
})
