/* eslint-env node, jest */
const {
  partition,
  range,
  zip,
  asyncPartition,
  asyncZip,
  asyncToArray,
  asyncIterable
} = require('iter-tools')

const asyncRange = (...args) => asyncIterable(range(...args))

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

describe('asyncPartition', function () {
  describe('sync predicate', () => {
    const predicate = n => n % 2 === 0

    describe('sync iterable', function () {
      it('empty iterable', async function () {
        const [evens, odds] = asyncPartition(predicate, [])

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([[], []])
      })

      it('range(10)', async function () {
        const [evens, odds] = asyncPartition(predicate, range(10))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([
          [0, 2, 4, 6, 8],
          [1, 3, 5, 7, 9]
        ])
      })

      it('calls func once for each item', async function () {
        const func = jest.fn(predicate)
        const [evens, odds] = asyncPartition(func, range(10))
        await asyncToArray(evens)
        await asyncToArray(odds)
        expect(func.mock.calls).toEqual(
          Array.from(range(10)).map(x => [x])
        )
      })

      it('iterate both evens and odds at the same time', async function () {
        const [evens, odds] = asyncPartition(predicate, range(10))
        const zipped = await asyncToArray(asyncZip(evens, odds))
        expect(zipped).toEqual([
          [0, 1],
          [2, 3],
          [4, 5],
          [6, 7],
          [8, 9]
        ])
      })
    })

    describe('async iterable', function () {
      it('empty iterable', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncIterable([]))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([[], []])
      })

      it('asyncRange(10)', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncRange(10))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([
          [0, 2, 4, 6, 8],
          [1, 3, 5, 7, 9]
        ])
      })

      it('calls func once for each item', async function () {
        const func = jest.fn(predicate)
        const [evens, odds] = asyncPartition(func, asyncRange(10))
        await asyncToArray(evens)
        await asyncToArray(odds)
        expect(func.mock.calls).toEqual(
          Array.from(range(10)).map(x => [x])
        )
      })

      it('iterate both evens and odds at the same time', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncRange(10))
        const zipped = await asyncToArray(asyncZip(evens, odds))
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

  describe('async predicate', () => {
    const predicate = async n => n % 2 === 0

    describe('sync iterable', function () {
      it('empty iterable', async function () {
        const [evens, odds] = asyncPartition(predicate, [])

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([[], []])
      })

      it('range(10)', async function () {
        const [evens, odds] = asyncPartition(predicate, range(10))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([
          [0, 2, 4, 6, 8],
          [1, 3, 5, 7, 9]
        ])
      })

      it('calls func once for each item', async function () {
        const func = jest.fn(predicate)
        const [evens, odds] = asyncPartition(func, range(10))
        await asyncToArray(evens)
        await asyncToArray(odds)
        expect(func.mock.calls).toEqual(
          Array.from(range(10)).map(x => [x])
        )
      })

      it('iterate both evens and odds at the same time', async function () {
        const [evens, odds] = asyncPartition(predicate, range(10))
        const zipped = await asyncToArray(asyncZip(evens, odds))
        expect(zipped).toEqual([
          [0, 1],
          [2, 3],
          [4, 5],
          [6, 7],
          [8, 9]
        ])
      })
    })

    describe('async iterable', function () {
      it('empty iterable', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncIterable([]))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([[], []])
      })

      it('asyncRange(10)', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncRange(10))

        expect([
          await asyncToArray(evens),
          await asyncToArray(odds)
        ]).toEqual([
          [0, 2, 4, 6, 8],
          [1, 3, 5, 7, 9]
        ])
      })

      it('calls func once for each item', async function () {
        const func = jest.fn(predicate)
        const [evens, odds] = asyncPartition(func, asyncRange(10))
        await asyncToArray(evens)
        await asyncToArray(odds)
        expect(func.mock.calls).toEqual(
          Array.from(range(10)).map(x => [x])
        )
      })

      it('iterate both evens and odds at the same time', async function () {
        const [evens, odds] = asyncPartition(predicate, asyncRange(10))
        const zipped = await asyncToArray(asyncZip(evens, odds))
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
})
