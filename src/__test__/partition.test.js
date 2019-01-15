/* eslint-env node, jest */
const { partition, range, zip } = require('iter-tools')

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

    it('calls func once for each item', function () {
      const func = jest.fn(isEven)
      const [evens, odds] = partition(func, range(10))
      Array.from(evens)
      Array.from(odds)
      expect(func.mock.calls).toEqual(
        Array.from(range(10)).map(x => [x])
      )
    })

    it('iterate both evens and odds at the same time', function () {
      const [evens, odds] = partition(isEven, range(10))
      const zipped = Array.from(zip(evens, odds))
      expect(zipped).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })
  })
})
