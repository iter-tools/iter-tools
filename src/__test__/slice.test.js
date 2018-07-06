/* eslint-env node, jest */
const { slice, asyncSlice, asyncToArray } = require('iter-tools')

describe('slice', function () {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('return simple slice', function () {
    expect(Array.from(slice(2, list))).toEqual([0, 1])
  })

  it('return simple slice with start/end', function () {
    expect(Array.from(slice({ start: 1, end: 4 }, list))).toEqual([1, 2, 3])
  })

  it('return simple slice with start/end/step', function () {
    expect(Array.from(slice({ start: 1, end: 6, step: 2 }, list))).toEqual([1, 3, 5])
  })

  it('return curried slice', function () {
    expect(Array.from(slice(2)(list))).toEqual([0, 1])
  })
})

describe('asyncSlice', function () {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('return simple slice', async function () {
    expect(await asyncToArray(asyncSlice(2, list))).toEqual([0, 1])
  })

  it('return simple slice with start/end', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 4 }, list))).toEqual([1, 2, 3])
  })

  it('return simple slice with start/end/step', async function () {
    expect(await asyncToArray(asyncSlice({ start: 1, end: 6, step: 2 }, list))).toEqual([1, 3, 5])
  })

  it('return curried slice', async function () {
    expect(await asyncToArray(asyncSlice(2)(list))).toEqual([0, 1])
  })
})
