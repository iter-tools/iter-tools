import multiPartition from './multi-partition'
import { iterableCurry } from './internal/iterable'

function partition (func, iter) {
  const [first, second] = multiPartition((item) => func(item) ? 0 : 1, iter)
  return [first, second]
}

export default iterableCurry(partition)
