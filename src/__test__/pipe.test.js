/* eslint-env node, jest */
const { map, filter, pipe } = require('iter-tools')

function bump (x) {
  return x + 3
}

function isEven (x) {
  return (x % 2) === 0
}

describe('pipe', function () {
  it('works', function () {
    const iter = pipe([1, 2, 3, 4], map(bump), filter(isEven))
    expect(Array.from(iter)).toEqual([4, 6])
  })
})
