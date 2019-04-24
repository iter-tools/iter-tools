import { asyncIterableCurry } from './internal/async-iterable'
import asyncSplitBy from './internal/async-split-by'

function asyncSplitAt (index, iterable) {
  return asyncSplitBy((item, i) => i >= index, iterable)
}

export default asyncIterableCurry(asyncSplitAt, { forceSync: true })
