/* eslint-env node, jest */
const { map, filter, compose } = require('iter-tools')

function power2 (x) {
  return x * x
}

function isEven (x) {
  return (x % 2) === 0
}

describe('compose', function () {
  it('composes iterables', function () {
    const iter = compose([map(power2), filter(isEven), map(power2)])
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([16, 256])
  })
})
