/* eslint-env node, jest */
const iter = require('iter-tools/internal/iter')
const { range } = require('iter-tools')

describe('iter', function () {
  it('works with iterables', function () {
    const i = range(3)
    expect(i).toBe(iter(i))
    expect(Array.from(iter(i))).toEqual([0, 1, 2])
  })
  it('works with Symbol.iterator', function () {
    const i = iter([0, 1, 2])
    expect(Array.from(i)).toEqual([0, 1, 2])
  })
  it('works with null', function () {
    const i = iter(null)
    expect(Array.from(i)).toEqual([])
  })
})
