import iter from './internal/iter'

function * map (func, iterable) {
  let c = 0
  for (const item of iter(iterable)) {
    yield func(item, c++)
  }
}

export default function curriedMap (func, iterable) {
  if (!iterable) {
    return iterable => map(func, iterable)
  }
  return map(func, iterable)
}
