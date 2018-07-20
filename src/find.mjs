import iter from './internal/iter'

function find (func, iterable) {
  let found = true
  let c = 0
  for (const item of iter(iterable)) {
    found = func(item, c++)
    if (found) {
      return item
    }
  }
  return null
}

export default function curriedFind (func, iterable) {
  if (!iterable) {
    return iterable => find(func, iterable)
  }
  return find(func, iterable)
}
