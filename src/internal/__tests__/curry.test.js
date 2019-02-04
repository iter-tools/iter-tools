/* eslint-env node, jest */
const { curry, variadicCurry } = require('../curry')

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

describe('variadicCurry', function () {
  it('curries', function () {
    const f = variadicCurry((x) => x === '\n', () => '!', (a, b, c) => a + b + c)
    expect(f('hello ')('world')('\n')).toBe('hello world!')
    // expect(f(1, 2)(3)).toBe(6)
    // expect(f(1, 2, 3)).toBe(6)
  })
  // it('works with empty invocation', function () {
  //   const f = curry((a, b, c) => a + b + c)
  //   expect(f()()(1)(2)(3)).toBe(6)
  // })
  // it('works with function with 0 arity', function () {
  //   const f = curry(() => 4)
  //   expect(f()).toBe(4)
  // })
})
