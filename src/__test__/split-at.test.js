/* eslint-env node, jest */
const { splitAt, asyncSplitAt, asyncToArray } = require('iter-tools')

describe('splitAt', function () {
  it('destructuring', function () {
    const [[...a], [...b]] = splitAt(3, [0, 1, 2, 3, 4])
    expect({ a, b }).toEqual({
      a: [0, 1, 2],
      b: [3, 4]
    })
  })
})

describe('asyncSplitAt', function () {
  it('destructuring', async function () {
    const [a, b] = await Promise.all(
      asyncSplitAt(3, [0, 1, 2, 3, 4])
        .map(iter => asyncToArray(iter))
    )

    expect({ a, b }).toEqual({
      a: [0, 1, 2],
      b: [3, 4]
    })
  })
})
