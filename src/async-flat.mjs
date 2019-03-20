import { asyncIterableCurry } from './internal/async-iterable'

const defaultShouldIFlat = (depth) => {
  if (typeof depth === 'function') {
    return depth
  }
  if (typeof depth === 'number') {
    return (currentDepth, iter) =>
      currentDepth <= depth &&
      (typeof iter[Symbol.iterator] === 'function' || typeof iter[Symbol.asyncIterator] === 'function') &&
      typeof iter !== 'string'
  }
  throw new Error('async-flat: "depth" can be a function or a number')
}

function asyncFlat (shouldIFlat = 1, iterable) {
  shouldIFlat = defaultShouldIFlat(shouldIFlat)
  async function * _asyncFlat (currentDepth, iterable) {
    if (await shouldIFlat(currentDepth, iterable)) {
      for await (const iter of iterable) {
        yield * _asyncFlat(currentDepth + 1, iter)
      }
    } else {
      yield iterable
    }
  }

  return _asyncFlat(0, iterable)
}

export default asyncIterableCurry(asyncFlat, {variadic: false}, 0, 1)
