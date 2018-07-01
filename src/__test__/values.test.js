/* eslint-env node, jest */
const { values, range } = require('iter-tools')

describe('values', function () {
  it('works with Map', function () {
    const map = new Map([['foo', 'bar'], ['fox', 'far']])
    expect(Array.from(values(map))).toEqual(Array.from(map.values()))
  })
  it('works with Objects', function () {
    const i = values({'1': 1, '2': 2})
    expect(Array.from(i)).toEqual([1, 2])
  })
  it('works with null', function() {
    const i = values(null)
    expect(Array.from(i)).toEqual([])
  })
})
