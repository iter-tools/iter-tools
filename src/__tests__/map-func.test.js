/* eslint-env node, jest */
const { applyMulti } = require('..')

const square = x => x * x
const double = x => x * 2

describe('applyMulti', function () {
  it('works map functions', function () {
    const mapped = applyMulti([square, double], [12, 11])
    expect(Array.from(mapped)).toEqual([144, 22])
  })
})
