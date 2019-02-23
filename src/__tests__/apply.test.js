/* eslint-env node, jest */
const { apply } = require('..')

describe('apply', function () {
  it('passes the function the iterable of arguments provided to it', function () {
    const testFn = jest.fn()
    apply(testFn, [2, 3])
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })

  it('can be curried', function () {
    const testFn = jest.fn()
    apply(testFn)([2, 3])
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })
})
