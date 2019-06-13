import { $isAsync, $async, $await } from '../macros/async.macro'
import { $first, range } from './$fns'

const $methodName = $isAsync ? 'asyncFirst' : 'first'

describe($methodName, () => {
  it('returns first item', $async(() => {
    const iter = range(10)
    expect($await($first(iter))).toBe(0)
  }))

  it('returns no items', $async(() => {
    const iter = range(0)
    expect($await($first(iter))).toBe(undefined)
  }))
})
