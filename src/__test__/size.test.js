/* eslint-env node, jest */
const { size, range } = require('iter-tools')

describe('size', function () {
  it('return length of array', function () {
    expect(size([1, 2, 3, 4, 5, 6])).toBe(6)
  });

  it('return number of items in iterable', function () {
    expect(size(range({ start: 1, end: 7 }))).toBe(6)
  })
})
