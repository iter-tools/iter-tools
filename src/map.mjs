import ensureIterable from './internal/ensure-iterable'

function * map (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    yield func(item, c++)
  }
}

export default function curriedMap (func, iterable) {
  if (!iterable) {
    return iterable => map(func, iterable)
  }
  return map(func, iterable)
}
