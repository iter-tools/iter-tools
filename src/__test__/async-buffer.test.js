/* eslint-env node, jest */
const { asyncBuffer, asyncToArray } = require('iter-tools')

function delay (ms) {
  if (ms <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// I had to build this because jest doesn't support es2018 natively

function intermittent () {
  let step = 0
  const sequence = [
    { delay: 0, value: 0 },
    { delay: 400, value: 1 },
    { delay: 0, value: 2 }
  ]

  return {
    [Symbol.asyncIterator]: () => ({
      async next () {
        if (step === sequence.length) {
          return { done: true }
        } else {
          const item = sequence[step++]
          await delay(item.delay || 0)
          return { value: item.value, done: false }
        }
      }
    })
  }
}

describe('asyncBuffer', function () {
  it('does not buffers', async function () {
    const iter = intermittent()[Symbol.asyncIterator]()
    const d0 = Date.now()
    await iter.next() // 0
    await delay(400)

    const d1 = Date.now()
    await iter.next() // 1
    await delay(400)

    const d2 = Date.now()
    await iter.next() // 2
    await delay(400)

    const d3 = Date.now()

    expect(d1 - d0).toBeLessThan(700)
    expect(d2 - d1).toBeGreaterThan(700)
    expect(d3 - d2).toBeLessThan(700)
  })

  it('buffers', async function () {
    const iter = asyncBuffer(2, intermittent())
    const d0 = Date.now()
    await iter.next() // 0
    await delay(400)

    const d1 = Date.now()
    await iter.next() // 1
    await delay(400)

    const d2 = Date.now()
    await iter.next() // 2
    await delay(400)

    const d3 = Date.now()

    expect(d1 - d0).toBeLessThan(700)
    expect(d2 - d1).toBeLessThan(700)
    expect(d3 - d2).toBeLessThan(700)
  })

  it('returns all items', async function () {
    const iter = asyncBuffer(2, intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2])
  })

  it('buffer using curry', async function () {
    const iter = asyncBuffer(2)(intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2])
  })

  it('buffer (bigger then iterable)', async function () {
    const iter = asyncBuffer(10, intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2])
  })
})
