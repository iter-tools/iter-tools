/* eslint-env node, jest */
const { cloneRegexp, isRegExp } = require('../regexp')

describe('cloneRegexp', function () {
  it('clones', function () {
    const clone = cloneRegexp(/abc/i, { global: true })
    expect(clone.source).toBe('abc')
    expect(clone.global).toBe(true)
    expect(clone.ignoreCase).toBe(true)
    expect(clone.multiline).toBe(false)
  })
})

describe('isRegExp', function () {
  it('detects a regexp', function () {
    expect(isRegExp(/a/)).toBe(true)
    expect(isRegExp(new RegExp('a'))).toBe(true)
  })

  it('detects if it is not a re', function () {
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp(1)).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp([])).toBe(false)
  })
})
