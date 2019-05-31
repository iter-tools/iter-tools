import { $isAsync, $async, $await } from '../macros/async.macro'
import { $tap, $toArray, range } from './$fns'

const $methodName = $isAsync ? 'asyncTap' : 'tap'

describe($methodName, () => {
  it('return tapped iterable', $async(() => {
    const iter = $tap((item) => item * 2, [1, 2, 3])
    expect($await($toArray(iter))).toEqual([1, 2, 3])
  }))

  it('return tapped iterable from iterable', $async(() => {
    const iter = $tap((item) => item * 2, range({ start: 1, end: 4 }))
    expect($await($toArray(iter))).toEqual([1, 2, 3])
  }))

  it('return tapped iterable (curried version)', $async(() => {
    const iter = $tap((item) => item * 2)
    expect($await($toArray(iter(range({ start: 1, end: 4 }))))).toEqual([1, 2, 3])
  }))
})
