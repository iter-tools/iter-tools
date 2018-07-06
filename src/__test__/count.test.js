/* eslint-env node, jest */
const { count } = require('iter-tools')

describe('count', function () {
  it('return infinite count', function () {
    const iter = count({ start: 10 })
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(11)
    expect(iter.next().value).toBe(12)
  })

  it('return infinite count with step', function () {
    const iter = count({start: 10, step: 5})
    expect(iter.next().value).toBe(10)
    expect(iter.next().value).toBe(15)
    expect(iter.next().value).toBe(20)
    expect(iter.next().value).toBe(25)
  })
})
