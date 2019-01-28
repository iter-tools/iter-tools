/* eslint-env node, jest */
const { map, filter, pipe } = require('iter-tools')

function bump (x) {
  return x + 3
}

function isEven (x) {
  return (x % 2) === 0
}

describe('pipe', function () {
  it('composes iterables', function () {
    const iter = pipe(map(bump), filter(isEven))
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([4, 6])
  })

  it('composes iterables (check order)', function () {
    const iter = pipe(filter(isEven), map(bump))
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([5, 7])
  })
})
