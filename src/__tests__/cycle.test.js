/* eslint-env node, jest */
const { cycle, asyncCycle, range } = require('..')

describe('cycle', function () {
  it('return infinite cycle', function () {
    const iter = cycle([1, 2, 3])[Symbol.iterator]()
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(1)
  })

  it('return infinite cycle (from iterator)', function () {
    const iter = cycle(range(3))[Symbol.iterator]()
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(0)
  })

  it('can be reused', function () {
    const myCycle = cycle(range(3))
    const iter1 = myCycle[Symbol.iterator]()
    expect(iter1.next().value).toBe(0)
    expect(iter1.next().value).toBe(1)

    const iter2 = myCycle[Symbol.iterator]()
    expect(iter2.next().value).toBe(0)
    expect(iter2.next().value).toBe(1)
  })
})

describe('asyncCycle', function () {
  it('return infinite cycle', async function () {
    const iter = asyncCycle([1, 2, 3])[Symbol.asyncIterator]()
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
  })

  it('return infinite cycle (from iterator)', async function () {
    const iter = asyncCycle(range(3))[Symbol.asyncIterator]()
    expect(await iter.next()).toEqual({ value: 0, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 0, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
  })

  it('can be reused', async function () {
    const myCycle = cycle(range(3))
    const iter1 = asyncCycle(myCycle)[Symbol.asyncIterator]()
    expect(await iter1.next()).toEqual({ value: 0, done: false })
    expect(await iter1.next()).toEqual({ value: 1, done: false })
    const iter2 = asyncCycle(myCycle)[Symbol.asyncIterator]()
    expect(await iter2.next()).toEqual({ value: 0, done: false })
    expect(await iter2.next()).toEqual({ value: 1, done: false })
  })
})
