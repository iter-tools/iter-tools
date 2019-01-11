/* eslint-env node, jest */
const { combinations } = require('iter-tools')

describe('combinations', function () {
  it('returns empty', function () {
    const iter = combinations([])
    expect(iter.getSize()).toEqual(0)
    expect(Array.from(iter)).toEqual([])
  })

  it('returns combinations', function () {
    const iter = combinations([1, 2])
    expect(iter.getSize()).toEqual(1)
    expect(Array.from(iter)).toEqual([[1, 2]])
  })

  it('returns combinations (max n)', function () {
    const iter = combinations([1, 2, 3, 4], 2)
    expect(iter.getSize()).toEqual(6)
    const expected = [ [ 1, 2 ],
      [ 1, 3 ],
      [ 1, 4 ],
      [ 2, 3 ],
      [ 2, 4 ],
      [ 3, 4 ]]

    expect(Array.from(iter)).toEqual(expected)
  })

  it('returns combinations 0', function () {
    const iter = combinations([1, 2, 3, 4], 0)
    expect(iter.getSize()).toEqual(0)

    const expected = []

    expect(Array.from(iter)).toEqual(expected)
  })
})
