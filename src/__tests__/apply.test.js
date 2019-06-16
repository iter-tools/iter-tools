import { apply } from '../..'

describe('apply', () => {
  it('passes the function the iterable of arguments provided to it', () => {
    const testFn = jest.fn()
    apply(testFn, [2, 3])
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })

  it('can be curried', () => {
    const testFn = jest.fn()
    apply(testFn)([2, 3])
    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenLastCalledWith(2, 3)
  })
})
