/* eslint-env node, jest */
const { consume, asyncConsume } = require('iter-tools')

describe('consume', function () {
  it('consumes an iterable', function () {
    const arr = []
    consume((item) => arr.push(item), [1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })

  it('consumes an iterable (curried)', function () {
    const arr = []
    const consumePush = consume((item) => arr.push(item))
    consumePush([1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })

  it('consumes an iterable (curried)', function () {
    const arr = []
    const consumePush = consume((item) => arr.push(item))
    consumePush([1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('asyncConsume', function () {
  it('consumes an iterable', async function () {
    const arr = []
    await asyncConsume((item) => arr.push(item), [1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })

  it('consumes an iterable using a promise', async function () {
    const arr = []
    await asyncConsume((item) => {
      arr.push(item)
      return Promise.resolve(0)
    }, [1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })

  it('consumes an iterable (curried)', async function () {
    const arr = []
    const consumePush = asyncConsume((item) => arr.push(item))
    await consumePush([1, 2, 3])
    expect(arr).toEqual([1, 2, 3])
  })
})
