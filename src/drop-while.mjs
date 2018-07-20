import iter from './internal/iter'

function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for (const item of iter(iterable)) {
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
