/* eslint-env node, jest */
const { nsmallest /* , asyncsmallest, asyncToArray, */ } = require('iter-tools')

describe('nsmallest', function () {
  it('return smallest iterable', function () {
    const smallest3 = nsmallest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([12, 6, 4])
    const smallest1 = nsmallest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest1)).toEqual([4])
  })

  it('return smallest iterable, using key', function () {
    const smallest2 = nsmallest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(smallest2)).toEqual(['ab', 'a'])
  })

  it('return smallest iterable, using iteratee', function () {
    const smallest2 = nsmallest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
    expect(Array.from(smallest2)).toEqual([{ id: 1 }])
  })

  it('return smallest iterable, using curry', function () {
    const smallest3 = nsmallest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
    expect(Array.from(smallest3)).toEqual([12, 6, 4])
    const smallest2 = nsmallest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
    expect(Array.from(smallest2)).toEqual(['ab', 'a'])
  })
})

// describe('asyncnsmallest', function () {
//   it('return smallest iterable', async function () {
//     const smallest3 = asyncNsmallest(3, [99, 12, 4, 6, 97, 44, 66, 77, 98])
//     expect(await asyncToArray(smallest3)).toEqual([97, 98, 99])
//     const smallest1 = asyncNsmallest(1, [99, 12, 4, 6, 97, 44, 66, 77, 98])
//     expect(await asyncToArray(smallest1)).toEqual([99])
//   })

//   it('return smallest iterable, using key', async function () {
//     const smallest2 = asyncNsmallest(2, (item) => item.length, ['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
//     expect(await asyncToArray(smallest2)).toEqual(['abcd', 'abcdef'])
//   })

//   it('return smallest iterable, using iteratee', async function () {
//     const smallest2 = asyncNsmallest(1, 'id', [{ id: 123 }, { id: 12 }, { id: 124 }, { id: 1 }, { id: 3 }])
//     expect(await asyncToArray(smallest2)).toEqual([{ id: 124 }])
//   })

//   it('return smallest iterable, using curry', async function () {
//     const smallest3 = asyncNsmallest(3)([99, 12, 4, 6, 97, 44, 66, 77, 98])
//     expect(await asyncToArray(smallest3)).toEqual([97, 98, 99])
//     const smallest2 = asyncNsmallest(2, (item) => item.length)(['abc', 'a', 'abcd', 'abcd', 'abcdef', 'ab'])
//     expect(await asyncToArray(smallest2)).toEqual(['abcd', 'abcdef'])
//   })
// })
