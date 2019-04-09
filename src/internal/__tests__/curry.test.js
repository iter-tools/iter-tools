/* eslint-env node, jest */
const { curry } = require('../curry')

describe('curry', function () {
  it('curries', function () {
    const f = curry((a, b, c) => a + b + c)
    expect(f(1)(2)(3)).toBe(6)
    expect(f(1, 2)(3)).toBe(6)
    expect(f(1, 2, 3)).toBe(6)
  })
  it('works with empty invocation', function () {
    const f = curry((a, b, c) => a + b + c)
    expect(f()()(1)(2)(3)).toBe(6)
  })
  it('works with function with 0 arity', function () {
    const f = curry(() => 4)
    expect(f()).toBe(4)
  })
})
