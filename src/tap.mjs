import iter from './iter'

function * tap (func, iterable) {
  let c = 0
  for (const item of iter(iterable)) {
    func(item, c++)
    yield item
  }
}

export default function curriedTap (func, iterable) {
  if (!iterable) {
    return iterable => tap(func, iterable)
  }
  return tap(func, iterable)
}
