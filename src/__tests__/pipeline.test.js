/* eslint-env node, jest */
const { map, merge, apply, fork, slice, filter, pipeline } = require('..')

function bump (x) {
  return x + 3
}

function isEven (x) {
  return (x % 2) === 0
}

const add = (a, b) => a + b
const mul = (a, b) => a * b

describe('pipeline', function () {
  it('works', function () {
    const iter = pipeline([1, 2, 3, 4], map(bump), filter(isEven))
    expect(Array.from(iter)).toEqual([4, 6])
  })

  it('can create a complex data processing pipeline', function () {
    expect(Array.from(pipeline(
      [3, 3],
      fork,
      slice(2),
      merge(apply).partial([add, mul])
    ))).toEqual([6, 9])
  })
})
