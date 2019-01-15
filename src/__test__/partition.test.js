/* eslint-env node, jest */
const { partition, range } = require('iter-tools')

describe('partition', function () {
  describe('evens and odds', function () {
    const isEven = n => n % 2 === 0

    it('empty iterable', function () {
      const [evens, odds] = partition(isEven, [])

      expect([
        Array.from(evens),
        Array.from(odds)
      ]).toEqual([[], []])
    })

    it('range(10)', function () {
      const [evens, odds] = partition(isEven, range(10))

      expect([
        Array.from(evens),
        Array.from(odds)
      ]).toEqual([
        [0, 2, 4, 6, 8],
        [1, 3, 5, 7, 9]
      ])
    })
  })
})
