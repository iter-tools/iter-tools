/* eslint-env node, jest */
const {
  merge,
  asyncMerge,
  asyncToArray,
  asyncThrottle,
  mergeByComparison,
  mergeByChance,
  mergeByPosition,
  asyncMergeByComparison,
  asyncMergeByChance,
  asyncMergeByPosition,
  asyncMergeByReadiness
} = require('..')

describe('merge', function () {
  it('interleaves 2 sorted sequences', function () {
    const iter = merge(mergeByComparison((a, b) => a - b), [[1, 2, 5, 6], [3, 4]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves 2 sorted sequences (curried)', function () {
    const iter = merge(mergeByComparison((a, b) => a - b))([[1, 2, 5, 6], [3, 4]])
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('merges by chance', function () {
    const iter = merge(mergeByChance([]), [[1, 2, 5, 6], [3, 4]])
    expect(Array.from(iter).length).toEqual(6)
  })

  it('merges by position', function () {
    const iter = merge(mergeByPosition(2), [[1, 2], [5, 6], [3, 4]])
    expect(Array.from(iter)).toEqual([1, 3, 5, 2, 4, 6])
  })
})

describe('asyncMerge', function () {
  it('interleaves 2 sorted sequences', async function () {
    const iter = asyncMerge(asyncMergeByComparison((a, b) => a - b), [[1, 2, 5, 6], [3, 4]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('interleaves 2 sorted sequences (curried)', async function () {
    const iter = asyncMerge(asyncMergeByComparison((a, b) => a - b))([[1, 2, 5, 6], [3, 4]])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('merges by chance', async function () {
    const iter = asyncMerge(asyncMergeByChance([]), [[1, 2, 5, 6], [3, 4]])
    expect((await asyncToArray(iter)).length).toEqual(6)
  })

  it('merges by position', async function () {
    const iter = asyncMerge(asyncMergeByPosition(2), [[1, 2], [5, 6], [3, 4]])
    expect(await asyncToArray(iter)).toEqual([1, 3, 5, 2, 4, 6])
  })

  it('interleaves sequences by timing', async function () {
    const seq1 = asyncThrottle(100, [0, 100, 200, 300, 400, 500])
    const seq2 = asyncThrottle(180, [0, 180, 360, 540])
    const iter = asyncMerge(asyncMergeByReadiness(1000), [seq1, seq2])
    expect(await asyncToArray(iter)).toEqual([0, 0, 100, 180, 200, 300, 360, 400, 500, 540])
  })

  it('interleaves sequences by timing (time is up)', async function () {
    const seq1 = asyncThrottle(100, [0, 100, 200, 300, 400, 500])
    const seq2 = asyncThrottle(180, [0, 180, 360, 540])
    let error
    try {
      const iter = asyncMerge(asyncMergeByReadiness(10), [seq1, seq2])
      await asyncToArray(iter)
    } catch (e) {
      error = e
    }
    expect(error.message).toEqual('async-merge: no sequence is ready after the configured interval')
  })
})
