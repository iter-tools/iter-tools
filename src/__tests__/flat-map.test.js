/* eslint-env node, jest */
const { flatMap, asyncFlatMap, asyncToArray, range } = require('..')

describe('flatMap', function () {
  it('returns flatMapped iterable', function () {
    const iter = flatMap((item) => [item, item * 2], [1, 2, 3])
    expect(Array.from(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns flatMapped iterable from iterable', function () {
    const iter = flatMap((item) => [item, item * 2], range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns flatMapped iterable (curried version)', function () {
    const iter = flatMap((item) => [item, item * 2])
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns empty iterable from null', function () {
    expect(Array.from(flatMap((item) => item, null))).toEqual([])
  })
})

describe('asyncFlatMap', function () {
  it('returns flatMapped iterable', async function () {
    const iter = asyncFlatMap((item) => [item, item * 2], [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns flatMapped iterable from iterable', async function () {
    const iter = asyncFlatMap((item) => [item, item * 2], range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns flatMapped iterable (curried version)', async function () {
    const iter = asyncFlatMap((item) => [item, item * 2])
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('returns empty iterable from null', async function () {
    expect(await asyncToArray(asyncFlatMap((item) => item, null))).toEqual([])
  })
})
