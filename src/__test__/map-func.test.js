/* eslint-env node, jest */
const { mapFunc } = require('iter-tools')

const square = x => x * x
const double = x => x * 2

describe('mapFunc', function () {
  it('works map functions', function () {
    const mapped = mapFunc([square, double], [12, 11])
    expect(Array.from(mapped)).toEqual([144, 22])
  })
})
