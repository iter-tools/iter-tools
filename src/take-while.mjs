import iter from './iter'

export default function takeWhile (func, iterable) {
  function * curriedTakeWhile (i) {
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
  if (iterable) {
    return curriedTakeWhile(iterable)
  }
  return curriedTakeWhile
}
