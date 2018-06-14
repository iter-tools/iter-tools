import iter from './iter'

function * takeWhile (func, i) {
  let take = true
  let c = 0
  for (const item of iter(i)) {
    take = func(item, c++)
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default function curriedTakeWhile (func, iterable) {
  if (!iterable) {
    return iterable => takeWhile(func, iterable)
  }
  return takeWhile(func, iterable)
}
