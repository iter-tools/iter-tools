import { $isAsync, $async, $await } from '../macros/async.macro'
import { $compress, $toArray, range } from './$fns'

const $methodName = $isAsync ? 'asyncCompress' : 'compress'

describe($methodName, () => {
  it('compress iterables', $async(() => {
    const iter = $compress(range(10), [0, 1, 0, 1, 1])
    expect($await($toArray(iter))).toEqual([1, 3, 4])
  }))
})
