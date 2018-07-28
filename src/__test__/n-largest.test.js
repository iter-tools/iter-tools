/* eslint-env node, jest */
const { nLargest, asyncNLargest, asyncToArray } = require('iter-tools')

describe('nlargest', function () {
  it('return largest iterable', function () {
    const largest3 = nLargest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(largest3)).toEqual([97, 98, 99])
    const largest1 = nLargest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(largest1)).toEqual([99])
  })

  it('return largest iterable, using key', function () {
    const largest2 = nLargest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(largest2)).toEqual(['abcd', 'abcdef'])
  })

  it('return largest iterable, using iteratee', function () {
    const largest2 = nLargest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
    expect(Array.from(largest2)).toEqual([{ id: 124 }])
  })

  it('return largest iterable, using curry', function () {
    const largest3 = nLargest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(largest3)).toEqual([97, 98, 99])
    const largest2 = nLargest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(largest2)).toEqual(['abcd', 'abcdef'])
  })
})

describe('asyncNLargest', function () {
  it('return largest iterable', async function () {
    const largest3 = asyncNLargest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(largest3)).toEqual([97, 98, 99])
    const largest1 = asyncNLargest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(largest1)).toEqual([99])
  })

  it('return largest iterable, using key', async function () {
    const largest2 = asyncNLargest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(await asyncToArray(largest2)).toEqual(['abcd', 'abcdef'])
  })

  it('return largest iterable, using iteratee', async function () {
    const largest2 = asyncNLargest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
    expect(await asyncToArray(largest2)).toEqual([{ id: 124 }])
  })

  it('return largest iterable, using curry', async function () {
    const largest3 = asyncNLargest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(largest3)).toEqual([97, 98, 99])
    const largest2 = asyncNLargest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(await asyncToArray(largest2)).toEqual(['abcd', 'abcdef'])
  })
})
