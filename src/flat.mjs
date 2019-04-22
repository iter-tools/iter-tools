import { iterableCurry } from './internal/iterable'

const defaultShouldIFlat = (depth) => {
  if (typeof depth === 'function') {
    return depth
  }
  if (typeof depth === 'number') {
    return (currentDepth, iter) =>
      currentDepth <= depth && typeof iter[Symbol.iterator] === 'function' && typeof iter !== 'string'
  }
  throw new Error('flat: "depth" can be a function or a number')
}

function flat (shouldIFlat = 1, iterable) {
  shouldIFlat = defaultShouldIFlat(shouldIFlat)
  function * _flat (currentDepth, iterable) {
    if (shouldIFlat(currentDepth, iterable)) {
      for (const iter of iterable) {
        yield * _flat(currentDepth + 1, iter)
      }
    } else {
      yield iterable
    }
  }
  return _flat(0, iterable)
}

export default iterableCurry(flat, { variadic: false }, 0, 1)
