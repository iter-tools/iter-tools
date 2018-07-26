/* eslint-env node, jest */
const { largest, /*asynclargest, asyncToArray,*/ range } = require('iter-tools')

function shuffleArray (a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

function shuffle (iterable) {
  return shuffleArray(Array.from(iterable))
}

const unsorted = shuffle(range(100))

describe('largest', function () {
  it('return largest iterable', function () {
    const largest3 = largest(3, unsorted)
    expect(Array.from(largest3)).toEqual([97, 98, 99])
    const largest1 = largest(1, unsorted)
    expect(Array.from(largest1)).toEqual([99])
  })

  it('return smallest iterable', function () {
    const smallest3 = largest(3, (a, b) => b - a, unsorted)
    expect(Array.from(smallest3)).toEqual([2, 1, 0])
    const smallest1 = largest(1, (a, b) => b - a, unsorted)
    expect(Array.from(smallest1)).toEqual([0])
  })

  // it('return largest iterable from iterable', function () {
  //   const iter = largest(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
  //   expect(Array.from(iter)).toEqual([2, 4, 6])
  // })

  // it('return largestped iterable (curried version)', function () {
  //   const iter = largest(function (item) { return item * 2 })
  //   expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
  // })
})

// describe('asynclargest', function () {
//   it('return largestped iterable', async function () {
//     const iter = asynclargest(function (item) { return item * 2 }, [1, 2, 3])
//     expect(await asyncToArray(iter)).toEqual([2, 4, 6])
//   })

//   it('return largestped iterable from iterable', async function () {
//     const iter = asynclargest(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
//     expect(await asyncToArray(iter)).toEqual([2, 4, 6])
//   })

//   it('return largestped iterable (curried version)', async function () {
//     const iter = asynclargest(function (item) { return item * 2 })
//     expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6])
//   })
// })
