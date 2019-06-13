import { $isAsync, $async, $await } from '../macros/async.macro'
import { $toArray, range } from './$fns'

const $methodName = $isAsync ? 'asyncToArray' : 'toArray'

describe($methodName, () => {
  it('works', $async(() => {
    expect($await($toArray(range(3)))).toEqual([0, 1, 2])
  }))
})
