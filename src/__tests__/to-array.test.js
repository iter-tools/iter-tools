/* eslint-env node, jest */
const { toArray, asyncToArray, range } = require('..')

describe('toArray', function () {
  it('works', function () {
    const iterable = range(3)
    expect(toArray(iterable)).toEqual([0, 1, 2])
  })
})

describe('asyncToArray', function () {
  it('works', async function () {
    const iterable = range({ start: 1, end: 4 })
    expect(await asyncToArray(iterable)).toEqual([1, 2, 3])
  })
})
