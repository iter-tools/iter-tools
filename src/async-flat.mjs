import ensureAsyncIterable from './internal/ensure-async-iterable'

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
  throw new Error('flat: "depth" can be a function or a number')
}

function asyncFlat (shouldIFlat, iterable) {
  async function * _asyncFlat (currentDepth, iterable) {
    if (await shouldIFlat(currentDepth, iterable)) {
      for await (const iter of iterable) {
        yield * _asyncFlat(currentDepth + 1, iter)
      }
    } else {
      yield iterable
    }
  }
  return _asyncFlat(0, ensureAsyncIterable(iterable))
}

export default function curriedAsyncFlat (...args) {
  if (args.length === 0) {
    return iterable => asyncFlat(defaultShouldIFlat(1), iterable)
  } else if (args.length === 1) {
    if (typeof args[0][Symbol.iterator] === 'function') {
      return asyncFlat(defaultShouldIFlat(1), args[0])
    } else {
      return iterable => asyncFlat(defaultShouldIFlat(args[0]), iterable)
    }
  } else {
    return asyncFlat(defaultShouldIFlat(args[0]), args[1])
  }
}
