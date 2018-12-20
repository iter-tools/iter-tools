/* eslint-env node, jest */
const { merge, asyncMerge, asyncToArray, enumerate, asyncThrottle } = require('iter-tools')

describe.only('merge', function () {
  it('interleaves 2 sorted sequences', function () {
    const minIndex = (items) => {
      const numbers = items
        .map(i => i === null ? Infinity : i.value)

      let min = Infinity
      let minIndex = 0
      for (const [index, n] of enumerate(numbers)) {
        if (n < min) {
          min = n
          minIndex = index
        }
      }
      return minIndex
    }
    const iter = merge(minIndex, [[1, 2, 5, 6], [3, 4]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves 2 sorted sequences (curried)', function () {
    const minIndex = (items) => {
      const numbers = items
        .map(i => i === null ? Infinity : i.value)

      let min = Infinity
      let minIndex = 0
      for (const [index, n] of enumerate(numbers)) {
        if (n < min) {
          min = n
          minIndex = index
        }
      }
      return minIndex
    }
    const iter = merge(minIndex)([[1, 2, 5, 6], [3, 4]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('asyncMerge', function () {
  it('interleaves 2 sorted sequences', async function () {
    const minIndex = async (promises) => {
      const items = promises
        .filter((item) => item)

      const numbers = (await Promise.all(items)).map(i => i.value)
      let min = Infinity
      let minIndex = 0
      for (const [index, n] of enumerate(numbers)) {
        if (n < min) {
          min = n
          minIndex = index
        }
      }
      return minIndex
    }
    const iter = asyncMerge(minIndex, [[1, 2, 5, 6], [3, 4]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves sequences by timing', async function () {
    const quickest = async (promises) => {
      const items = promises
        .filter((item) => item)
      await Promise.race(items)

      for (const [n, promise] of enumerate(promises)) {
        if (promise && !promise.isPending()) {
          return n
        }
      }
    }
    const seq1 = asyncThrottle(10, [0, 10, 20, 30, 40, 50])
    const seq2 = asyncThrottle(18, [0, 18, 36, 54])
    const iter = asyncMerge(quickest, [seq1, seq2])
    expect(await asyncToArray(iter)).toEqual([0, 0, 10, 18, 20, 30, 36, 40, 50, 54])
  })
})
