import ensureIterable from './internal/ensure-iterable'

function * flat (depth, iterable) {
  if (depth === 0) {
    yield * ensureIterable(iterable)
  } else {
    for (const iter of ensureIterable(iterable)) {
      if (typeof iter !== 'string' && typeof iter[Symbol.iterator] === 'function') {
        yield * flat(depth - 1, iter)
      } else {
        yield iter
      }
    }
  }
}

export default function curriedFlat (depth, iterable) {
  if (arguments.length === 0) {
    return iterable => flat(1, iterable)
  } else if (arguments.length === 1) {
    if (typeof depth === 'number') {
      return iterable => flat(depth, iterable)
    } else {
      return flat(1, depth)
    }
  } else {
    return flat(depth, iterable)
  }
}
