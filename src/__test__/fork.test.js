/* eslint-env node, jest */
const { fork, zip } = require('iter-tools')

describe('fork', function () {
  it('iterate each part one by one', function () {
    const [a, b, c, d] = fork([0, 1, 2, 3, 4, 5])
    expect(
      [a, b, c, d].map(iter => Array.from(iter))
    ).toEqual(
      Array(4).fill([0, 1, 2, 3, 4, 5])
    )
  })

  it('zip them together', function () {
    const [a, b, c, d] = fork([0, 1, 2, 3, 4, 5])
    const zipped = zip(a, b, c, d)
    expect(Array.from(zipped)).toEqual(
      [0, 1, 2, 3, 4, 5].map(x => [x, x, x, x])
    )
  })
})
