/* eslint-env node, jest */
const { every, asyncEvery, asyncIterable } = require('iter-tools')

describe('every', function () {
  it('returns true if all items is true', function () {
    expect(every((n) => n % 2 === 0, [4, 2, 6, 4, 8, 6])).toBe(true)
  })

  it('returns false if one item are false', function () {
    expect(every((n) => n % 2 === 0, [4, 1, 6, 4, 8, 6])).toBe(false)
  })

  it('returns true if there are no items', function () {
    expect(every((n) => n % 2 === 0, null)).toBe(true)
  })
})

describe('asyncEvery', function () {
  it('returns true if at least one item is true', async function () {
    expect(await asyncEvery((n) => n % 2 === 0, asyncIterable([4, 2, 6, 4, 8, 6]))).toBe(true)
  })

  it('returns true if at least one item is true (using a promise)', async function () {
    expect(await asyncEvery((n) => Promise.resolve(n % 2 === 0), asyncIterable([4, 2, 6, 4, 8, 6]))).toBe(true)
  })

  it('returns false if all items are false', async function () {
    expect(await asyncEvery((n) => n % 2 === 0, asyncIterable([4, 1, 6, 4, 8, 6]))).toBe(false)
  })

  it('returns true if there are no items', async function () {
    expect(await asyncEvery((n) => n % 2 === 0, null)).toBe(true)
  })
})
