/* eslint-env node, jest */
const { permutations } = require('..')

describe('permutations', function () {
  it('returns empty', function () {
    const iter = permutations([])
    expect(iter.getSize()).toEqual(0)
    expect(Array.from(iter)).toEqual([])
  })

  it.only('returns permutations', function () {
    const iter = permutations(2, [1, 2])
    // expect(iter.getSize()).toEqual(2)
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]])
  })

  it('can be reused', function () {
    const iter = permutations([1, 2])
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]])
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]])
  })

  it('returns permutations', function () {
    const iter = permutations(2, [1, 2, 3, 4])
    expect(iter.getSize()).toEqual(12)
    const expected = [ [ 1, 2 ],
      [ 1, 3 ],
      [ 1, 4 ],
      [ 2, 1 ],
      [ 2, 3 ],
      [ 2, 4 ],
      [ 3, 1 ],
      [ 3, 2 ],
      [ 3, 4 ],
      [ 4, 1 ],
      [ 4, 2 ],
      [ 4, 3 ] ]

    expect(Array.from(iter)).toEqual(expected)
  })
})
