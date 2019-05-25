import { $async, $await, $isAsync } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

const defaultShouldFlat = item =>
  (
    $isAsync
      ? typeof item[Symbol.iterator] === 'function' || typeof item[Symbol.asyncIterator] === 'function'
      : typeof item[Symbol.iterator] === 'function'
  ) &&
  typeof item !== 'string'

function flat (shouldFlat = defaultShouldFlat, depthOrOptions = 1, iterable) {
  let depth = depthOrOptions
  if (depthOrOptions && typeof depthOrOptions === 'object') {
    ({ shouldFlat = defaultShouldFlat, depth = 1 } = depthOrOptions)
  }

  $async; function * _flat (currentDepth, iterable) {
    $await; for (const item of iterable) {
      if (currentDepth < depth && $await(shouldFlat(item))) {
        yield * _flat(currentDepth + 1, item)
      } else {
        yield item
      }
    }
  }

  return _flat(0, iterable)
}

export default iterableCurry(flat, { minArgs: 0, maxArgs: 2 })
