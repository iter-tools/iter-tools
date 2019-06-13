import { $isAsync, $async, $await } from '../macros/async.macro'
import { $concat, $toArray, range } from './$fns'

const $methodName = $isAsync ? 'asyncConcat' : 'concat'

describe($methodName, () => {
  it('concats iterables', $async(() => {
    const iter = $concat(range({ start: 1, end: 3 }), [3, 4])
    expect($await($toArray(iter))).toEqual([1, 2, 3, 4])
  }))
})
