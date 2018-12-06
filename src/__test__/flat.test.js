/* eslint-env node, jest */
const { flat, asyncFlat, asyncToArray } = require('iter-tools')

describe('flat', function () {
  it('flats iterable', function () {
    const iter = flat(1, [[1, 2], [3, 4], [5]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable (default one level)', function () {
    const iter = flat([[1, 2], [3, 4], [5]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable, curried', function () {
    const iter = flat(1)([[1, 2], [3, 4], [5]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable, curried (default one level)', function () {
    const iter = flat()([[1, 2], [3, 4], [5]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable depth 0', function () {
    const iter = flat(0, [[1, 2], [3, 4], [5]])
    expect(Array.from(iter)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('flats iterable depth 2', function () {
    const iter = flat(2, [[1, 2], [3, [4, 5]], [[6]]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('asyncFlat', function () {
  it('flats iterable', async function () {
    const iter = asyncFlat(1, [[1, 2], [3, 4], [5]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable (default one level)', async function () {
    const iter = asyncFlat([[1, 2], [3, 4], [5]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable, curried', async function () {
    const iter = asyncFlat(1)([[1, 2], [3, 4], [5]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable, curried (default one level)', async function () {
    const iter = asyncFlat()([[1, 2], [3, 4], [5]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5])
  })

  it('flats iterable depth 0', async function () {
    const iter = asyncFlat(0, [[1, 2], [3, 4], [5]])
    expect(await asyncToArray(iter)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('flats iterable depth 2', async function () {
    const iter = asyncFlat(2, [[1, 2], [3, [4, 5]], [[6]]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })
})
