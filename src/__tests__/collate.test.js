/* eslint-env node, jest */
const {
  collate,
  asyncCollate,
  asyncToArray
} = require('..')

describe('collate', function () {
  it('interleaves 2 sorted sequences', function () {
    const iter = collate((a, b) => a - b, [1, 2, 5, 6], [3, 4])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves 2 sorted sequences (curried)', function () {
    const iter = collate((a, b) => a - b)([1, 2, 5, 6], [3, 4])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('collates by position', function () {
    const iter = collate(2, [1, 2], [5, 6], [3, 4])
    expect(Array.from(iter)).toEqual([1, 3, 5, 2, 4, 6])
  })
})

describe('asyncCollate', function () {
  it('interleaves 2 sorted sequences', async function () {
    const iter = asyncCollate((a, b) => a - b, [1, 2, 5, 6], [3, 4])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves 2 sorted sequences (curried)', async function () {
    const iter = asyncCollate((a, b) => a - b)([1, 2, 5, 6], [3, 4])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('collates by position', async function () {
    const iter = asyncCollate(2, [1, 2], [5, 6], [3, 4])
    expect(await asyncToArray(iter)).toEqual([1, 3, 5, 2, 4, 6])
  })
})
