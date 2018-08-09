/* eslint-env node, jest */
const CircularBuffer = require('iter-tools/internal/circular-buffer')

describe('circularArray', function () {
  it('works with iterables', function () {
    const a = new CircularBuffer(3)
    expect(a.counter).toBe(0)
    expect(a.push(1)).toBe(undefined)
    expect(a.counter).toBe(1)

    expect(a.push(2)).toBe(undefined)
    expect(a.counter).toBe(2)

    expect(a.push(3)).toBe(undefined)
    expect(a.counter).toBe(3)

    expect(a.push(4)).toBe(1)
    expect(a.counter).toBe(4)

    expect(a.push(5)).toBe(2)
    expect(a.counter).toBe(5)

    expect(a.push(6)).toBe(3)
    expect(a.counter).toBe(6)

    expect(a.push(7)).toBe(4)
    expect(a.counter).toBe(7)
  })
})
