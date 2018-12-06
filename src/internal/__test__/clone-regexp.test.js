/* eslint-env node, jest */
const cloneRegexp = require('iter-tools/internal/clone-regexp')

describe('cloneRegexp', function () {
  it('clones', function () {
    const clone = cloneRegexp(/abc/i, { global: true })
    expect(clone.source).toBe('abc')
    expect(clone.global).toBe(true)
    expect(clone.ignoreCase).toBe(true)
    expect(clone.multiline).toBe(false)
  })
})
