/* eslint-env node, jest */
const { combinationsWithReplacement } = require('..')

describe('combinationsWithReplacement', function () {
  it('returns empty', function () {
    const iter = combinationsWithReplacement([])
    expect(iter.getSize()).toEqual(0)
    expect(Array.from(iter)).toEqual([])
  })

  it('returns combinationsWithReplacement', function () {
    const iter = combinationsWithReplacement([1, 2])
    expect(iter.getSize()).toEqual(3)
    expect(Array.from(iter)).toEqual([[1, 1], [1, 2], [2, 2]])
  })

  it('can be reused', function () {
    const iter = combinationsWithReplacement([1, 2])
    expect(Array.from(iter)).toEqual([[1, 1], [1, 2], [2, 2]])
    expect(Array.from(iter)).toEqual([[1, 1], [1, 2], [2, 2]])
  })

  it('returns combinationsWithReplacement (max n)', function () {
    const iter = combinationsWithReplacement(2, [1, 2, 3, 4])
    expect(iter.getSize()).toEqual(10)
    const expected = [
      [ 1, 1 ],
      [ 1, 2 ],
      [ 1, 3 ],
      [ 1, 4 ],
      [ 2, 2 ],
      [ 2, 3 ],
      [ 2, 4 ],
      [ 3, 3 ],
      [ 3, 4 ],
      [ 4, 4 ]]

    expect(Array.from(iter)).toEqual(expected)
  })
})
