import { asyncIterableCurry } from './internal/async-iterable'

const defaultShouldFlat = item => (typeof item[Symbol.iterator] === 'function' || typeof item[Symbol.asyncIterator] === 'function') && typeof item !== 'string'

function flat (shouldFlat = defaultShouldFlat, depthOrOptions = 1, iterable) {
  let depth = depthOrOptions
  if (depthOrOptions && typeof depthOrOptions === 'object') {
    ({ shouldFlat = defaultShouldFlat, depth = 1 } = depthOrOptions)
  }

  async function * _flat (currentDepth, iterable) {
    for await (const item of iterable) {
      if (currentDepth < depth && (await shouldFlat(item))) {
        yield * _flat(currentDepth + 1, item)
      } else {
        yield item
      }
    }
  }

  return _flat(0, iterable)
}

export default asyncIterableCurry(flat, { minArgs: 0, maxArgs: 2 })
