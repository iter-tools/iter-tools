/* eslint-env node, jest */
const { apply } = require('..')

describe('apply', function () {
  let testFn = jest.fn()

  beforeEach(function () {
    jest.resetAllMocks()
  })

  it('calls the passed function', function () {
    apply(testFn)
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith()

    apply(testFn)
    expect(testFn).toHaveBeenCalledTimes(2)
  })

  it('passes the function the extra arguments provided to it', function () {
    apply(testFn, [2, 3])
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })
})
