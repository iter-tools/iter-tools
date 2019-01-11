/* eslint-env node, jest */
const { product, tee } = require('iter-tools')

describe('product', function () {
  it('returns empty', function () {
    const iter = product()
    expect(iter.getSize()).toEqual(0)
    expect(Array.from(iter)).toEqual([])
  })

  it('returns single', function () {
    const iter = product([1, 2, 3])
    expect(iter.getSize()).toEqual(3)
    expect(Array.from(iter)).toEqual([[1], [2], [3]])
  })

  it('returns double', function () {
    const iter = product([1, 2], [3, 4])
    expect(iter.getSize()).toEqual(4)
    expect(Array.from(iter)).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]])
  })

  it('returns with repeat', function () {
    const iter = product(...tee([1, 2], 2))
    expect(iter.getSize()).toEqual(4)
    expect(Array.from(iter)).toEqual([[1, 1], [1, 2], [2, 1], [2, 2]])
  })

  it('returns triple', function () {
    const iter = product([1, 2], [3, 4], [5, 6])
    expect(iter.getSize()).toEqual(8)
    expect(Array.from(iter)).toEqual([
      [1, 3, 5],
      [1, 3, 6],
      [1, 4, 5],
      [1, 4, 6],
      [2, 3, 5],
      [2, 3, 6],
      [2, 4, 5],
      [2, 4, 6]
    ])
  })
})
