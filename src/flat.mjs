import ensureIterable from './internal/ensure-iterable'

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

function flat (shouldIFlat, iterable) {
  function * _flat (currentDepth, iterable) {
    if (shouldIFlat(currentDepth, iterable)) {
      for (const iter of iterable) {
        yield * _flat(currentDepth + 1, iter)
      }
    } else {
      yield iterable
    }
  }
  return _flat(0, ensureIterable(iterable))
}

export default function curriedFlat (...args) {
  if (args.length === 0) {
    return iterable => flat(defaultShouldIFlat(1), iterable)
  } else if (args.length === 1) {
    if (typeof args[0][Symbol.iterator] === 'function') {
      return flat(defaultShouldIFlat(1), args[0])
    } else {
      return iterable => flat(defaultShouldIFlat(args[0]), iterable)
    }
  } else {
    return flat(defaultShouldIFlat(args[0]), args[1])
  }
}
