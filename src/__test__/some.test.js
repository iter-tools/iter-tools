/* eslint-env node, jest */
const { some, asyncSome, asyncIterable } = require('iter-tools')

describe('some', function () {
  it('returns true if at least one item is true', function () {
    expect(some((n) => n % 2 === 0, [1, 2, 3, 4, 5, 6])).toBe(true)
  })

  it('returns false if all items are false', function () {
    expect(some((n) => n % 2 === 0, [1, 3, 3, 7, 5, 1])).toBe(false)
  })
})

describe('asyncSome', function () {
  it('returns true if at least one item is true', async function () {
    expect(await asyncSome((n) => n % 2 === 0, asyncIterable([1, 2, 3, 4, 5, 6]))).toBe(true)
  })

  it('returns false if all items are false', async function () {
    expect(await asyncSome((n) => n % 2 === 0, asyncIterable([1, 3, 3, 7, 5, 1]))).toBe(false)
  })
})
