/* eslint-env node, jest */
const { consumeMany, asyncConsumeMany } = require('iter-tools')

describe('consume', function () {
  it('consumes an iterable or iterables', function () {
    const arr = []
    consumeMany((item) => arr.push(item), [[1, 2, 3], [3, 4, 5], [6]])
    expect(arr).toEqual([1, 3, 6, 2, 4, 3, 5])
  })
})

describe('asyncConsume', function () {
  it.skip('consumes an iterable', async function () {
    const arr = []
    await asyncConsumeMany((item) => arr.push(item), [[1, 2, 3], [3, 4, 5], [6]])
    expect(arr).toEqual([1, 2, 3, 4, 5, 6])
  })
})
