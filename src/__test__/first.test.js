/* eslint-env node, jest */
const { first, asyncFirst, range } = require('iter-tools')

describe('first', function () {
  it('returns first item', function () {
    const iter = range(10)
    const a = first(iter)
    expect(a).toBe(0)
  })

  it('returns no items', function () {
    const iter = range(0)
    const a = first(iter)
    expect(a).toBe(undefined)
  })
})

describe('asyncFirst', function () {
  it('returns first item', async function () {
    const a = await asyncFirst(range(10))
    expect(a).toBe(0)
  })

  it('returns no items', async function () {
    const a = await asyncFirst(range(10))
    expect(a).toBe(0)
  })
})
