/* eslint-env node, jest */
const { reduce, asyncReduce, range } = require('iter-tools')

describe('reduce', function () {
  it('sums an array', function () {
    const sum = reduce(function (acc = 0, x) {
      return acc + x
    }, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })

  it('sums a range', function () {
    const sum = reduce(function (acc = 0, x) {
      return acc + x
    }, range(4))
    expect(sum).toBe(6)
  })

  it('sums a range (using curry)', function () {
    const sum = reduce(function (acc = 0, x) {
      return acc + x
    })
    expect(sum(range(4))).toBe(6)
  })
})

describe('asyncReduce', function () {
  it('sums an array', async function () {
    const sum = await asyncReduce(function (acc = 0, x) {
      return acc + x
    }, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })

  it('sums a range', async function () {
    const sum = await asyncReduce(function (acc = 0, x) {
      return acc + x
    }, range(4))
    expect(sum).toBe(6)
  })

  it('sums a range (using curry)', async function () {
    const sum = asyncReduce(function (acc = 0, x) {
      return acc + x
    })
    expect(await sum(range(4))).toBe(6)
  })
})
