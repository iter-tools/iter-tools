import asyncMultiPartition from './async-multi-partition'
import { asyncIterableCurry } from './internal/async-iterable'

function asyncPartition (func, iter) {
  const [first, second] = asyncMultiPartition(async (item) => (await func(item)) ? 0 : 1, iter)
  return [first, second]
}

export default asyncIterableCurry(asyncPartition)
