/* eslint-env node, jest */
const { takeSorted, asyncTakeSorted, asyncToArray } = require('iter-tools')

describe('takeSorted', function () {
  it('return smallest iterable', function () {
    const smallest3 = takeSorted(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([97, 98, 99])
    const smallest1 = takeSorted(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest1)).toEqual([99])
  })
  it('return smallest iterable, using comparator', function () {
    const smallest2 = takeSorted(2, (a, b) => a.length - b.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(smallest2)).toEqual(['abcd', 'abcdef'])
  })
  it('return smallest iterable, using curry', function () {
    const smallest3 = takeSorted(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([97, 98, 99])
  })
})

describe('asyncTakeSorted', function () {
  it('return smallest iterable', async function () {
    const smallest3 = asyncTakeSorted(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest3)).toEqual([97, 98, 99])
    const smallest1 = asyncTakeSorted(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest1)).toEqual([99])
  })
  it('return smallest iterable, using comparator', async function () {
    const smallest2 = asyncTakeSorted(2, (a, b) => a.length - b.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(await asyncToArray(smallest2)).toEqual(['abcd', 'abcdef'])
  })
  it('return smallest iterable, using curry', async function () {
    const smallest3 = asyncTakeSorted(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(await asyncToArray(smallest3)).toEqual([97, 98, 99])
  })
})
