/* eslint-env node, jest */
const { repeat } = require('..')

describe('repeat', function () {
  it('return simple repeat', function () {
    expect(Array.from(repeat(10, 3))).toEqual([10, 10, 10])
  })

  it('return infinite repeat', function () {
    const iter = repeat(10)
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
  })
})
