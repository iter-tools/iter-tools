import { entries } from '../..'

describe('entries', () => {
  it('works with Map', () => {
    const mapEntries = [['foo', 'foo'], ['bar', 'bar']]
    const map = new Map(mapEntries)
    expect(Array.from(entries(map))).toEqual(mapEntries)
  })
  it('works with Objects', () => {
    const i = entries({ '1': 1, '2': 2 })
    expect(Array.from(i)).toEqual([['1', 1], ['2', 2]])
  })
  it('can be reused', () => {
    const i = entries({ '1': 1, '2': 2 })
    expect(Array.from(i)).toEqual([['1', 1], ['2', 2]])
    expect(Array.from(i)).toEqual([['1', 1], ['2', 2]])
  })
  it('works with null', () => {
    const i = entries(null)
    expect(Array.from(i)).toEqual([])
  })
})
