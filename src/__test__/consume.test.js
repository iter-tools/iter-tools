/* eslint-env node, jest */
const { consume, asyncConsume } = require('iter-tools')

describe('consume', function () {
  it('consume an iterable', function () {
    const arr = []
    consume((item) => arr.push(item), [1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
  it('consume an iterable (curried)', function () {
    const arr = []
    const consumePush = consume((item) => arr.push(item))
    consumePush([1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('asyncConsume', function () {
  it('consume an iterable', async function () {
    const arr = []
    await asyncConsume((item) => arr.push(item), [1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
  it('consume an iterable (curried)', async function () {
    const arr = []
    const consumePush = asyncConsume((item) => arr.push(item))
    await consumePush([1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
})
