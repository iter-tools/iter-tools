/* eslint-env node, jest */
const factorial = require('iter-tools/internal/factorial')

describe('factorial', function () {
  it('0', function () {
    expect(factorial(0)).toEqual(1)
  })
  it('1', function () {
    expect(factorial(1)).toEqual(1)
  })
  it('2', function () {
    expect(factorial(2)).toEqual(2)
  })
  it('3', function () {
    expect(factorial(3)).toEqual(6)
  })
})
