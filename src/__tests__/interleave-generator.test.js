/* eslint-env node, jest */
const { interleaveGenerator } = require('..')

describe('interleaveGenerator', function () {
  it('can be used to implement a round robin interleave', function () {
    const a = [1, 2, 3]
    const b = [4, 5, 6]
    const c = [7, 8, 9]

    const interleaved = interleaveGenerator(a, b, c)(function * (canTakeAny, a, b, c) {
      while (canTakeAny()) {
        if (a.canTake()) yield a.take()
        if (b.canTake()) yield b.take()
        if (c.canTake()) yield c.take()
      }
    })

    expect(Array.from(interleaved)).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])
  })
})
