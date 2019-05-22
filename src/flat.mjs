import { iterableCurry } from './internal/iterable'

const defaultShouldFlat = item => typeof item[Symbol.iterator] === 'function' && typeof item !== 'string'

function flat (shouldFlat = defaultShouldFlat, depthOrOptions = 1, iterable) {
  let depth = depthOrOptions
  if (depthOrOptions && typeof depthOrOptions === 'object') {
    ({ shouldFlat = defaultShouldFlat, depth = 1 } = depthOrOptions)
  }

  function * _flat (currentDepth, iterable) {
    for (const item of iterable) {
      if (currentDepth < depth && shouldFlat(item)) {
        yield * _flat(currentDepth + 1, item)
      } else {
        yield item
      }
    }
  }

  return _flat(0, iterable)
}

export default iterableCurry(flat, { minArgs: 0, maxArgs: 2 })
