import { $isAsync, $async, $await } from '../../generate/async.macro'
import { $reduce, asyncReduce, reduce, range } from '../..'
import { $OneTwoThreeIterable } from './__framework__/fixtures'

describe($async`reduce`, () => {
  it('sums an array', $async(() => {
    const sum = $await($reduce((acc = 0, x) => acc + x, [0, 1, 2, 3]))
    expect(sum).toBe(6)
  }))

  it('sums a range', $async(() => {
    const sum = $await($reduce((acc = 0, x) => acc + x, range(4)))
    expect(sum).toBe(6)
  }))

  it('sums using a specified initial value', $async(() => {
    const sum = $await($reduce(1, (acc, x) => acc + x, range(4)))
    expect(sum).toBe(7)
  }))

  it('sums using the initial value as the initial value', $async(() => {
    const sum = $await($reduce((acc, x) => acc + x, range({ start: 2, end: 4 })))
    expect(sum).toBe(5)
  }))

  it('returns specified initial value when iterable is empty', $async(() => {
    const sum = $await($reduce(0, (acc, x) => acc + x, []))
    expect(sum).toBe(0)
  }))

  it('throws when no initial value specified and iterable is empty', $async(() => {
    if ($isAsync) {
      expect(asyncReduce((acc, x) => acc + x, [])).rejects.toThrow()
    } else {
      expect(() => {
        reduce((acc, x) => acc + x, [])
      }).toThrow()
    }
  }))

  it('sums a range (using curry)', $async(() => {
    const sum = $reduce((acc = 0, x) => acc + x)
    expect($await(sum(range(4)))).toBe(6)
  }))

  it('cleans up iterable', $async(() => {
    const oneTwoThree = new $OneTwoThreeIterable()
    try {
      $await($reduce((acc = 0, x) => {
        throw new Error('ops')
      }, oneTwoThree))
    } catch (e) {
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    }
  }))
})
