/* eslint-env node, jest */
const ensureAsyncIterable = require('iter-tools/internal/ensure-async-iterable')
const { range } = require('iter-tools')

describe('ensureAsyncIterable', function () {
  it('transform sync iter to async', async function () {
    const iter = ensureAsyncIterable(range({ start: 1, end: 4 }))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: undefined, done: true })
  })
})
