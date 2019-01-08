/* eslint-env node, jest */
const { map, filter, pipeline } = require('iter-tools')

function bump (x) {
  return x + 3
}

function isEven (x) {
  return (x % 2) === 0
}

describe('pipeline', function () {
  it('using function', function () {
    const iter = pipeline(() => [1, 2, 3, 4], map(bump), filter(isEven))
    expect(Array.from(iter())).toEqual([4, 6])
  })

  it('use composition', function () {
    const iter = pipeline(map(bump), filter(isEven))
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([4, 6])
  })
})
