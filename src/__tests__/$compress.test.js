import { $async, $await } from '../../generate/async.macro'
import { $compress, $toArray, range } from '../..'

describe($async`compress`, () => {
  it('compress iterables', $async(() => {
    const iter = $compress(range(10), [0, 1, 0, 1, 1])
    expect($await($toArray(iter))).toEqual([1, 3, 4])
  }))
})
