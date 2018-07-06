/* eslint-env node, jest */
const { flatMap, asyncFlatMap, asyncToArray, range } = require('iter-tools')

describe('flatMap', function () {
  it('return flatMapped iterable', function () {
    const iter = flatMap(function (item) { return [item, item * 2] }, [1, 2, 3])
    expect(Array.from(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('return flatMapped iterable from iterable', function () {
    const iter = flatMap(function (item) { return [item, item * 2] }, range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('return flatMapped iterable (curried version)', function () {
    const iter = flatMap(function (item) { return [item, item * 2] })
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 2, 4, 3, 6])
  })
})

describe('asyncFlatMap', function () {
  it('return flatMapped iterable', async function () {
    const iter = asyncFlatMap(function (item) { return [item, item * 2] }, [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('return flatMapped iterable from iterable', async function () {
    const iter = asyncFlatMap(function (item) { return [item, item * 2] }, range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('return flatMapped iterable (curried version)', async function () {
    const iter = asyncFlatMap(function (item) { return [item, item * 2] })
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 2, 4, 3, 6])
  })
})
