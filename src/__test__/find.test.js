/* eslint-env node, jest */
const { find, asyncFind, range } = require('iter-tools')

describe('find', function () {
  it('returns found item', function () {
    const found = find((item) => item === 5, [1, 2, 3, 4, 5, 6])
    expect(found).toBe(5)
  })

  it('returns undefined if no item found', function () {
    const found = find((item) => item === 100, [1, 2, 3, 4, 5, 6])
    expect(found).toBe(undefined)
  })

  it('returns found item from iterable', function () {
    const found = find((item) => item === 5, range({ start: 1, end: 7 }))
    expect(found).toBe(5)
  })

  it('returns undefined if no item found from iterable', function () {
    const found = find((item) => item === 100, range({ start: 1, end: 7 }))
    expect(found).toBe(undefined)
  })

  it('returns filtered iterable (curried version)', function () {
    const findFive = find((item) => item === 5)
    expect(findFive(range({ start: 1, end: 7 }))).toBe(5)
  })

  it('returns undefined if passed null', function () {
    const found = find((item) => item === 100, null)
    expect(found).toBe(undefined)
  })
})

describe('asyncFind', function () {
  it('returns found item', async function () {
    const found = asyncFind((item) => item === 5, [1, 2, 3, 4, 5, 6])
    expect(await found).toBe(5)
  })

  it('returns found item (using a promise)', async function () {
    const found = asyncFind(async (item) => item === 5, [1, 2, 3, 4, 5, 6])
    expect(await found).toBe(5)
  })

  it('returns undefined if no item found', async function () {
    const found = asyncFind((item) => item === 100, [1, 2, 3, 4, 5, 6])
    expect(await found).toBe(undefined)
  })

  it('returns found item from iterable', async function () {
    const found = asyncFind((item) => item === 5, range({ start: 1, end: 7 }))
    expect(await found).toBe(5)
  })

  it('returns undefined if no item found from iterable', async function () {
    const found = asyncFind((item) => item === 100, range({ start: 1, end: 7 }))
    expect(await found).toBe(undefined)
  })

  it('returns filtered iterable (curried version)', async function () {
    const findFive = asyncFind((item) => item === 5)
    expect(await findFive(range({ start: 1, end: 7 }))).toBe(5)
  })

  it('returns undefined if passed null', async function () {
    const found = asyncFind((item) => item, null)
    expect(await found).toBe(undefined)
  })
})
