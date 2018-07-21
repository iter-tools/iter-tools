/* eslint-env node, jest */
const { toArray, asyncToArray, asyncIterable, range } = require('iter-tools')

describe('toArray', function () {
  it('works', function () {
    const iterable = range(3)
    expect(toArray(iterable)).toEqual([0, 1, 2])
  })
})

describe('asyncToArray', async function () {
  it('works', async function () {
    const iterable = asyncIterable(range({ start: 1, end: 4 }))
    expect(await asyncToArray(iterable)).toEqual([1, 2, 3])
  })
})
