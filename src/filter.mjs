import ensureIterable from './internal/ensure-iterable'

function * filter (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (func(item, c++)) {
      yield item
    }
  }
}

export default function curriedFilter (func, iterable) {
  if (!iterable) {
    return iterable => filter(func, iterable)
  }
  return filter(func, iterable)
}
