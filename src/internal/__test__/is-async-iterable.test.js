/* eslint-env node, jest */
const isAsyncIterable = require('iter-tools/internal/is-async-iterable')
const asyncify = require('iter-tools/internal/asyncify')
const { range } = require('iter-tools')

describe('isAsyncIterable', function () {
  it('works', function () {
    expect(isAsyncIterable(range(3))).toBe(false)
    expect(isAsyncIterable([])).toBe(false)
    expect(isAsyncIterable(null)).toBe(false)
    expect(isAsyncIterable(asyncify([]))).toBe(true)
  })
})
