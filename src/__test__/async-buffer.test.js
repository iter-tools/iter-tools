/* eslint-env node, jest */
const { asyncBuffer, asyncToArray } = require('iter-tools')

function delay (ms) {
  if (ms <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// I have to build this because jest doesn't support es2018 natively

function intermittent () {
  let step = 0
  const sequence = [
    { delay: 0, value: 0 },
    { delay: 40, value: 1 },
    { delay: 0, value: 2 },
    { delay: 0, value: 3 },
    { delay: 40, value: 4 },
    { delay: 0, value: 5 },
    { delay: 0, value: 6 }
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
  it.skip('does not buffers', async function () {
    const iter = intermittent()[Symbol.asyncIterator]()
    const d0 = Date.now()
    await iter.next() // 0
    await delay(40)

    const d1 = Date.now()
    await iter.next() // 1
    await delay(40)

    const d2 = Date.now()
    await iter.next() // 2
    await delay(40)

    const d3 = Date.now()
    await iter.next() // 3
    await delay(40)

    const d4 = Date.now()
    await iter.next() // 4
    await delay(40)

    const d5 = Date.now()
    await iter.next() // 5
    await delay(40)

    const d6 = Date.now()
    await iter.next() // 6
    await delay(40)

    const d7 = Date.now()

    expect(d1 - d0).toBeLessThan(70)
    expect(d2 - d1).toBeGreaterThan(70)
    expect(d3 - d2).toBeLessThan(70)
    expect(d4 - d3).toBeLessThan(70)
    expect(d5 - d4).toBeGreaterThan(70)
    expect(d6 - d5).toBeLessThan(70)
    expect(d7 - d6).toBeLessThan(70)
  })

  it.skip('buffers', async function () {
    const iter = asyncBuffer(2, intermittent())
    const d0 = Date.now()
    await iter.next() // 0
    await delay(40)

    const d1 = Date.now()
    await iter.next() // 1
    await delay(40)

    const d2 = Date.now()
    await iter.next() // 2
    await delay(40)

    const d3 = Date.now()
    await iter.next() // 3
    await delay(40)

    const d4 = Date.now()
    await iter.next() // 4
    await delay(40)

    const d5 = Date.now()
    await iter.next() // 5
    await delay(40)

    const d6 = Date.now()
    await iter.next() // 6
    await delay(40)

    const d7 = Date.now()

    expect(d1 - d0).toBeLessThan(70)
    expect(d2 - d1).toBeLessThan(70)
    expect(d3 - d2).toBeLessThan(70)
    expect(d4 - d3).toBeLessThan(70)
    expect(d5 - d4).toBeLessThan(70)
    expect(d6 - d5).toBeLessThan(70)
    expect(d7 - d6).toBeLessThan(70)
  })

  it('returns all items', async function () {
    const iter = asyncBuffer(2, intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('buffer using curry', async function () {
    const iter = asyncBuffer(2)(intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('buffer (bigger then iterable)', async function () {
    const iter = asyncBuffer(10, intermittent())
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5, 6])
  })
})
