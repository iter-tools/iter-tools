/* eslint-env node, jest */
const { size, asyncSize, asyncIterable, range } = require('..')

describe('size', function () {
  it('return length of array', function () {
    expect(size([1, 2, 3, 4, 5, 6])).toBe(6)
  })

  it('return number of items in iterable', function () {
    expect(size(range({ start: 1, end: 7 }))).toBe(6)
  })
})

describe('asyncSize', function () {
  it('return length of array', async function () {
    expect(await asyncSize(asyncIterable([1, 2, 3, 4, 5, 6]))).toBe(6)
  })

  it('return number of items in iterable', async function () {
    expect(await asyncSize(asyncIterable(range({ start: 1, end: 7 })))).toBe(6)
  })
})
