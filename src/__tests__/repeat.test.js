/* eslint-env node, jest */
const { repeat } = require('..')

describe('repeat', function () {
  it('return simple repeat', function () {
    expect(Array.from(repeat(10, 3))).toEqual([10, 10, 10])
  })

  it('can be reused', function () {
    const myRepeat = repeat(10, 3)
    expect(Array.from(myRepeat)).toEqual([10, 10, 10])
    expect(Array.from(myRepeat)).toEqual([10, 10, 10])
  })

  it('return infinite repeat', function () {
    const iterable = repeat(10)
    const iter = iterable[Symbol.iterator]()
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(10)
  })
})
