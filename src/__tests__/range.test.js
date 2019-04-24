/* eslint-env node, jest */
const { range } = require('..')

describe('range', function () {
  it('return simple range', function () {
    expect(Array.from(range(3))).toEqual([0, 1, 2])
  })

  it('return simple range with start/end', function () {
    expect(Array.from(range({ start: 3, end: 6 }))).toEqual([3, 4, 5])
  })

  it('can be reused', function () {
    const myRange = range({ start: 3, end: 6 })
    expect(Array.from(myRange)).toEqual([3, 4, 5])
    expect(Array.from(myRange)).toEqual([3, 4, 5])
  })

  it('return simple range with start/end and step', function () {
    expect(Array.from(range({ start: 3, end: 6, step: 2 }))).toEqual([3, 5])
  })

  it('return empty array for negative end', function () {
    expect(Array.from(range(-2))).toEqual([])
  })

  it('return empty array for negative end', function () {
    expect(Array.from(range({ start: -2, end: -5 }))).toEqual([])
  })

  it('return backward count', function () {
    expect(Array.from(range({ start: -2, end: -5, step: -1 }))).toEqual([-2, -3, -4])
  })
})
