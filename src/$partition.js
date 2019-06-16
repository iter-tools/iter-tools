import { $async, $await } from '../generate/async.macro'

import multiPartition from './$multi-partition'
import { $iterableCurry } from './internal/$iterable'

function $partition (func, iter) {
  const [first, second] = multiPartition($async(item => $await(func(item)) ? 0 : 1), iter)
  return [first, second]
}

export default $iterableCurry($partition, { reduces: true })
