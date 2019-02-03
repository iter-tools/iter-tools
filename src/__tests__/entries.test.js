/* eslint-env node, jest */
const { entries } = require('..')

describe('entries', function () {
  it('works with Map', function () {
    const mapEntries = [['foo', 'foo'], ['bar', 'bar']]
    const map = new Map(mapEntries)
    expect(Array.from(entries(map))).toEqual(mapEntries)
  })
  it('works with Objects', function () {
    const i = entries({'1': 1, '2': 2})
    expect(Array.from(i)).toEqual([['1', 1], ['2', 2]])
  })
  it('works with null', function () {
    const i = entries(null)
    expect(Array.from(i)).toEqual([])
  })
})
