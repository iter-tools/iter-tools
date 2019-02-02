/* eslint-env node, jest */
const isIterable = require('iter-tools/internal/is-iterable')
const { range } = require('iter-tools')

describe('isIterable', function () {
  it('works', function () {
    expect(isIterable(range(3))).toBe(true)
    expect(isIterable([])).toBe(true)
    expect(isIterable(null)).toBe(false)
  })
})
