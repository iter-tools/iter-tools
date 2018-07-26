import ensureIterable from './internal/ensure-iterable'

function every (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (!func(item, c++)) {
      return false
    }
  }
  return true
}

export default function curriedEvery (func, iterable) {
  if (!iterable) {
    return iterable => every(func, iterable)
  }

  return every(func, iterable)
}
