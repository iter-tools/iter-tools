/* eslint-env node, jest */
const { splitAt, range, asyncSplitAt, asyncIterable, asyncToArray } = require('iter-tools')

describe('splitAt', function () {
  it('destructuring', function () {
    const [[a, b, c], [d, e, f]] = splitAt(3, range())
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })
})

describe('asyncSplitAt', function () {
  it('sync iter', async function () {
    const [first, second] = asyncSplitAt(3, range(6))
    expect(await Promise.all([
      asyncToArray(first),
      asyncToArray(second)
    ])).toEqual([[0, 1, 2], [3, 4, 5]])
  })

  it('async iter', async function () {
    const [first, second] = asyncSplitAt(3, asyncIterable(range(6)))
    expect(await Promise.all([
      asyncToArray(first),
      asyncToArray(second)
    ])).toEqual([[0, 1, 2], [3, 4, 5]])
  })
})
