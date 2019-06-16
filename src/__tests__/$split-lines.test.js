import { $async, $await } from '../../generate/async.macro'
import { $splitLines, $toArray } from '../..'

describe($async`splitLines`, () => {
  it('should split 1', $async(() => {
    const iter = $splitLines(['aa', '\nb', 'cc'])
    expect($await($toArray(iter))).toEqual(['aa', 'bcc'])
  }))

  it('should split 2', $async(() => {
    const iter = $splitLines(['aa\n', 'b ', 'cc\n'])
    expect($await($toArray(iter))).toEqual(['aa', 'b cc', ''])
  }))
})
