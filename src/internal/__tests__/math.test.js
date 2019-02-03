/* eslint-env node, jest */
const { factorial, permutationsSize, combinationsSize, combinationsWithReplacementSize } = require('../math')

describe('factorial', function () {
  it('0', function () {
    expect(Number(factorial(0))).toEqual(1)
  })
  it('1', function () {
    expect(Number(factorial(1))).toEqual(1)
  })
  it('2', function () {
    expect(Number(factorial(2))).toEqual(2)
  })
  it('3', function () {
    expect(Number(factorial(3))).toEqual(6)
  })
})

describe('permutationsSize', function () {
  it('small', function () {
    expect(permutationsSize(10, 2)).toEqual(90)
  })
  it('big', function () {
    expect(permutationsSize(1000, 4)).toEqual(994010994000) // NaN using doubles
  })
})

describe('combinationsSize', function () {
  it('small', function () {
    expect(combinationsSize(10, 2)).toEqual(45)
  })
  it('big', function () {
    expect(combinationsSize(1000, 4)).toEqual(41417124750) // NaN using doubles
  })
})

describe('combinationsWithReplacementSize', function () {
  it('small', function () {
    expect(combinationsWithReplacementSize(10, 2)).toEqual(55)
  })
  it('big', function () {
    expect(combinationsWithReplacementSize(1000, 4)).toEqual(41917125250) // NaN using doubles
  })
})
