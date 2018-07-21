import ensureIterable from './internal/ensure-iterable'

function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (!drop) {
      yield item
    } else {
      drop = func(item, c++)
      if (!drop) {
        yield item
      }
    }
  }
}

export default function curriedDropWhile (func, iterable) {
  if (!iterable) {
    return iterable => dropWhile(func, iterable)
  }
  return dropWhile(func, iterable)
}
