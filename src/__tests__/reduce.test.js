/* eslint-env node, jest */
const { reduce, asyncReduce, asyncIterable, range } = require('..')

describe('reduce', function () {
  it('sums an array', function () {
    const sum = reduce((acc = 0, x) => acc + x, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })

  it('sums a range', function () {
    const sum = reduce((acc = 0, x) => acc + x, range(4))
    expect(sum).toBe(6)
  })

  it('sums using a specified initial value', function () {
    const sum = reduce(1, (acc, x) => acc + x, range(4))
    expect(sum).toBe(7)
  })

  it('sums using the initial value as the initial value', function () {
    const sum = reduce((acc, x) => acc + x, range({start: 2, end: 4}))
    expect(sum).toBe(5)
  })

  it('returns specified initial value when iterable is empty', function () {
    const sum = reduce(0, (acc, x) => acc + x, [])
    expect(sum).toBe(0)
  })

  it('throws when no initial value specified and iterable is empty', function () {
    expect(() => {
      reduce((acc, x) => acc + x, [])
    }).toThrow()
  })

  it('sums a range (using curry)', function () {
    const sum = reduce((acc = 0, x) => acc + x)
    expect(sum(range(4))).toBe(6)
  })
})

describe('asyncReduce', function () {
  it('sums an array', async function () {
    const sum = await asyncReduce((acc = 0, x) => acc + x, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })

  it('sums an array (using a promise)', async function () {
    const sum = await asyncReduce(async (acc = 0, x) => acc + x, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })

  it('sums a range', async function () {
    const sum = await asyncReduce((acc = 0, x) => acc + x, asyncIterable(range(4)))
    expect(sum).toBe(6)
  })

  it('sums using the initial value as the initial value', async function () {
    const sum = await asyncReduce((acc, x) => acc + x, asyncIterable(range({start: 2, end: 4})))
    expect(sum).toBe(5)
  })

  it('returns specified initial value when iterable is empty', async function () {
    const sum = await asyncReduce(0, (acc, x) => acc + x, asyncIterable([]))
    expect(sum).toBe(0)
  })

  it('throws when no initial value specified and iterable is empty', async function () {
    expect(asyncReduce((acc, x) => acc + x, asyncIterable([]))).rejects.toThrow()
  })

  it('sums a range (using curry)', async function () {
    const sum = asyncReduce((acc = 0, x) => acc + x)
    expect(await sum(asyncIterable(range(4)))).toBe(6)
  })

  it('sums synchronous iterables', async function () {
    const sum = await asyncReduce((acc = 0, x) => acc + x, [0, 1, 2, 3])
    expect(sum).toBe(6)
  })
})
