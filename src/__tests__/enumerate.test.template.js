import { $isAsync, $async, $await } from '../macros/async.macro'
import { $enumerate, $toArray, range } from './$fns'

const $methodName = $isAsync ? 'asyncEnumerate' : 'enumerate'

describe($methodName, () => {
  it('enumerates iterables', $async(() => {
    const iter = $enumerate(range({ start: 1, end: 4 }))
    expect($await($toArray(iter))).toEqual([[0, 1], [1, 2], [2, 3]])
  }))

  it('enumerates iterables with start', $async(() => {
    const iter = $enumerate(range({ start: 1, end: 4 }), 3)
    expect($await($toArray(iter))).toEqual([[3, 1], [4, 2], [5, 3]])
  }))
})
