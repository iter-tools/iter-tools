/* eslint-env node, jest */
const { nSmallest, asyncNSmallest, asyncToArray } = require('iter-tools')

describe('nSmallest', function () {
  it('return smallest iterable', function () {
    const smallest3 = nSmallest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([12, 6, 4])
    const smallest1 = nSmallest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest1)).toEqual([4])
  })

  it('return smallest iterable, using key', function () {
    const smallest2 = nSmallest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(smallest2)).toEqual(['ab', 'a'])
  })

  it('return smallest iterable, using iteratee', function () {
    const smallest2 = nSmallest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
    expect(Array.from(smallest2)).toEqual([{ id: 1 }])
  })

  it('return smallest iterable, using curry', function () {
    const smallest3 = nSmallest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([12, 6, 4])
    const smallest2 = nSmallest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(smallest2)).toEqual(['ab', 'a'])
  })
})

describe('asyncNSmallest', function () {
  it('return smallest iterable', async function () {
    const smallest3 = asyncNSmallest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest3)).toEqual([12, 6, 4])
    const smallest1 = asyncNSmallest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest1)).toEqual([4])
  })

  it('return smallest iterable, using key', async function () {
    const smallest2 = asyncNSmallest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(await asyncToArray(smallest2)).toEqual(['ab', 'a'])
  })

  it('return smallest iterable, using iteratee', async function () {
    const smallest2 = asyncNSmallest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
    expect(await asyncToArray(smallest2)).toEqual([{ id: 1 }])
  })

  it('return smallest iterable, using curry', async function () {
    const smallest3 = asyncNSmallest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest3)).toEqual([12, 6, 4])
    const smallest2 = asyncNSmallest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(await asyncToArray(smallest2)).toEqual(['ab', 'a'])
  })
})
