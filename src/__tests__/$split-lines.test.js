import { $isAsync, $async, $await } from '../macros/async.macro'
import { $splitLines, $toArray } from './$fns'

const $methodName = $isAsync ? 'asyncSplitLines' : 'splitLines'

describe($methodName, () => {
  it('should split 1', $async(() => {
    const iter = $splitLines(['aa', '\nb', 'cc'])
    expect($await($toArray(iter))).toEqual(['aa', 'bcc'])
  }))

  it('should split 2', $async(() => {
    const iter = $splitLines(['aa\n', 'b ', 'cc\n'])
    expect($await($toArray(iter))).toEqual(['aa', 'b cc', ''])
  }))
})
