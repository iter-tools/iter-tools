import { $isAsync, $async, $await, $iteratorSymbol } from '../macros/async.macro'
// Note: cycle is not templated so it is not in ./$fns
import { cycle, asyncCycle, range } from '..'

const $cycle = $isAsync ? asyncCycle : cycle
const $methodName = $isAsync ? 'asyncCycle' : 'cycle'

describe($methodName, () => {
  it('return infinite cycle', $async(() => {
    const iter = $cycle([1, 2, 3])[$iteratorSymbol]()
    expect($await(iter.next())).toEqual({ value: 1, done: false })
    expect($await(iter.next())).toEqual({ value: 2, done: false })
    expect($await(iter.next())).toEqual({ value: 3, done: false })
    expect($await(iter.next())).toEqual({ value: 1, done: false })
    expect($await(iter.next())).toEqual({ value: 2, done: false })
    expect($await(iter.next())).toEqual({ value: 3, done: false })
  }))

  it('return infinite cycle (from iterator)', $async(() => {
    const iter = $cycle(range(3))[$iteratorSymbol]()
    expect($await(iter.next())).toEqual({ value: 0, done: false })
    expect($await(iter.next())).toEqual({ value: 1, done: false })
    expect($await(iter.next())).toEqual({ value: 2, done: false })
    expect($await(iter.next())).toEqual({ value: 0, done: false })
    expect($await(iter.next())).toEqual({ value: 1, done: false })
    expect($await(iter.next())).toEqual({ value: 2, done: false })
  }))

  it('can be reused', $async(() => {
    const myCycle = $cycle(range(3))
    const iter1 = myCycle[$iteratorSymbol]()
    expect($await(iter1.next())).toEqual({ value: 0, done: false })
    expect($await(iter1.next())).toEqual({ value: 1, done: false })
    const iter2 = myCycle[$iteratorSymbol]()
    expect($await(iter2.next())).toEqual({ value: 0, done: false })
    expect($await(iter2.next())).toEqual({ value: 1, done: false })
  }))
})
