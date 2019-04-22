/* eslint-env node, jest */
const { keys } = require('..')

describe('keys', function () {
  it('works with Map', function () {
    const map = new Map([['foo', 'bar'], ['fox', 'far']])
    expect(Array.from(keys(map))).toEqual(Array.from(map.keys()))
  })
  it('works with Objects', function () {
    const i = keys({ '1': 1, '2': 2 })
    expect(Array.from(i)).toEqual(['1', '2'])
  })
  it('works with null', function () {
    const i = keys(null)
    expect(Array.from(i)).toEqual([])
  })
})
