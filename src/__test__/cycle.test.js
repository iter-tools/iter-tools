/* eslint-env node, jest */
const { cycle, asyncCycle, range } = require('iter-tools')

describe('cycle', function () {
  it('return infinite cycle', function () {
    const iter = cycle([1, 2, 3])
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(1)
  })

  it('return infinite cycle (from iterator)', function () {
    const iter = cycle(range(3))
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(0)
  })
})

describe('asyncCycle', function () {
  it('return infinite cycle', async function () {
    const iter = asyncCycle([1, 2, 3])
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
  })

  it('return infinite cycle (from iterator)', async function () {
    const iter = asyncCycle(range(3))
    expect(await iter.next()).toEqual({ value: 0, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 0, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
  })
})
