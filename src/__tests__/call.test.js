/* eslint-env node, jest */
const { call } = require('..')

describe('call', function () {
  it('calls the passed function', function () {
    const testFn = jest.fn()
    call(testFn)
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith()

    call(testFn)
    expect(testFn).toHaveBeenCalledTimes(2)
  })

  it('passes the function the extra arguments provided to it', function () {
    const testFn = jest.fn()
    call(testFn, 2, 3)
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })
})
