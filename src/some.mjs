import ensureIterable from './internal/ensure-iterable'

function some (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (func(item, c++)) {
      return true
    }
  }
  return false
}

export default function curriedSome (func, iterable) {
  if (!iterable) {
    return iterable => some(func, iterable)
  }

  return some(func, iterable)
}
