import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * asyncFlat (depth, iterable) {
  if (depth === 0) {
    yield * ensureAsyncIterable(iterable)
  } else {
    for await (const iter of ensureAsyncIterable(iterable)) {
      if (iter[Symbol.iterator] || iter[Symbol.asyncIterator]) {
        yield * asyncFlat(depth - 1, iter)
      } else {
        yield iter
      }
    }
  }
}

export default function curriedAsyncFlat (depth, iterable) {
  if (arguments.length === 0) {
    return iterable => asyncFlat(1, iterable)
  } else if (arguments.length === 1) {
    if (typeof depth === 'number') {
      return iterable => asyncFlat(depth, iterable)
    } else {
      return asyncFlat(1, depth)
    }
  } else {
    return asyncFlat(depth, iterable)
  }
}
