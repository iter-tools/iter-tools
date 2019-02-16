/* eslint-env node, jest */
const {
  multiPartition,
  asyncMultiPartition,
  range,
  slice,
  toArray,
  asyncToArray,
  pipe } = require('..')

describe('multiPartition', function () {
  const allToArray = (...args) => args.map(iter => toArray(iter))

  describe('x => x % 4', function () {
    const func = x => x % 4

    it('empty iterable', function () {
      const [a, b, c, d] = multiPartition(func, [])
      expect(allToArray(a, b, c, d)).toEqual(Array(4).fill([]))
    })

    it('range(16)', function () {
      const [a, b, c, d] = multiPartition(func, range(16))
      expect(allToArray(a, b, c, d)).toEqual([
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
      ])
    })

    it('out-of-bound access returns empty iterables', function () {
      const iv = pipe(
        multiPartition(func),
        slice({ start: 6, end: 8 }),
        Array.from
      )(range(16))
      expect(allToArray(...iv)).toEqual([[], []])
    })
  })
})

describe('asyncMultiPartition', function () {
  const allToArray = (...args) => Promise.all(args.map(iter => asyncToArray(iter)))

  describe('x => x % 4', function () {
    const func = x => x % 4

    it('empty iterable', async function () {
      const [a, b, c, d] = asyncMultiPartition(func, [])
      expect(await allToArray(a, b, c, d)).toEqual(Array(4).fill([]))
    })

    it('range(16)', async function () {
      const [a, b, c, d] = asyncMultiPartition(func, range(16))
      expect(await allToArray(a, b, c, d)).toEqual([
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
      ])
    })

    it('out-of-bound access returns empty iterables', async function () {
      const iv = pipe(
        asyncMultiPartition(func),
        slice({ start: 6, end: 8 }),
        toArray
      )(range(16))
      expect(await allToArray(...iv)).toEqual([[], []])
    })
  })
})
