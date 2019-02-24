/* eslint-env node, jest */
const { interleaveGenerator, asyncInterleaveGenerator, asyncToArray } = require('..')

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('interleaveGenerator', function () {
  const a = [1, 2, 3]
  const b = [4, 5, 6]
  const c = [7, 8, 9]

  it('can be used to implement a round robin interleave', function () {
    const roundRobin = interleaveGenerator(function * (canTakeAny, a, b, c) {
      while (canTakeAny()) {
        if (a.canTake()) yield a.take()
        if (b.canTake()) yield b.take()
        if (c.canTake()) yield c.take()
      }
    })

    expect(Array.from(roundRobin(a, b, c))).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])
  })

  it('can use the return value of canTakeAny to do concatenation', () => {
    const concatenate = interleaveGenerator(function * (canTakeAny) {
      let buffer
      while ((buffer = canTakeAny())) yield buffer.take()
    })

    expect(Array.from(concatenate(a, b, c))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})

describe('asyncInterleaveGenerator', function () {
  const a = [1, 2, 3]
  const b = [4, 5, 6]
  const c = [7, 8, 9]

  it('can be used to implement a round robin interleave', async function () {
    const roundRobin = asyncInterleaveGenerator(async function * (canTakeAny, a, b, c) {
      while (await canTakeAny()) {
        if (await a.canTake()) yield (await a.take())
        if (await b.canTake()) yield (await b.take())
        if (await c.canTake()) yield (await c.take())
      }
    })

    expect(await asyncToArray(roundRobin(a, b, c))).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])
  })

  it('can use the return value of canTakeAny to interleave by promise readiness', async function () {
    const interleaveReady = asyncInterleaveGenerator(async function * (canTakeAny) {
      let buffer
      while ((buffer = await canTakeAny())) yield (await buffer.take())
    })

    const a = (async function * () {
      await wait(10)
      yield 1
      await wait(30)
      yield 2
    })()

    const b = (async function * () {
      await wait(20)
      yield 3
      await wait(10)
      yield 4
    })()

    expect(await asyncToArray(interleaveReady(a, b))).toEqual([1, 3, 4, 2])
  })
})
