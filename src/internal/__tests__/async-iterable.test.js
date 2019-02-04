/* eslint-env node, jest */
const { ensureAsyncIterable, isAsyncIterable, asyncify } = require('../async-iterable')
const { range } = require('../..')

describe('ensureAsyncIterable', function () {
  it('transform sync iter to async', async function () {
    const iter = ensureAsyncIterable(range({ start: 1, end: 4 }))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: undefined, done: true })
  })
})

describe('isAsyncIterable', function () {
  it('works', function () {
    expect(isAsyncIterable(range(3))).toBe(false)
    expect(isAsyncIterable([])).toBe(false)
    expect(isAsyncIterable(null)).toBe(false)
    expect(isAsyncIterable(asyncify([]))).toBe(true)
  })
})
