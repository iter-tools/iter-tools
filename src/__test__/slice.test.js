/* eslint-env node, jest */
const { slice, asyncSlice, asyncToArray } = require('iter-tools')

describe('slice', function () {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('returns simple slice', function () {
    expect(Array.from(slice(2, list))).toEqual([0, 1])
  })

  it('returns simple slice with start/end', function () {
    expect(Array.from(slice({ start: 1, end: 4 }, list))).toEqual([1, 2, 3])
  })

  it('returns simple slice with start/end/step', function () {
    expect(Array.from(slice({ start: 1, end: 6, step: 2 }, list))).toEqual([1, 3, 5])
  })

  it('returns empty iterable when passed out of bounds indicies', function () {
    expect(Array.from(slice({ start: 1, end: 6, step: 2 }, []))).toEqual([])
  })

  it('returns empty iterable when passed null iterable', function () {
    expect(Array.from(slice({ start: 1, end: 4 }, null))).toEqual([])
  })

  it('returns curried slice', function () {
    expect(Array.from(slice(2)(list))).toEqual([0, 1])
  })
})

describe('asyncSlice', function () {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('returns simple slice', async function () {
    expect(await asyncToArray(asyncSlice(2, list))).toEqual([0, 1])
  })

  it('returns simple slice with start/end', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 4 }, list))).toEqual([1, 2, 3])
  })

  it('returns simple slice with start/end/step', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 6, step: 2 }, list))).toEqual([1, 3, 5])
  })

  it('returns empty iterable when passed out of bounds indicies', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 6, step: 2 }, []))).toEqual([])
  })

  it('returns empty iterable when passed null iterable', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 4 }, null))).toEqual([])
  })

  it('returns curried slice', async function () {
    expect(await asyncToArray(asyncSlice(2)(list))).toEqual([0, 1])
  })
})
