import asyncIter from './async-iter'

export default function takeWhile (func, iterable) {
  async function * curriedTakeWhile (i) {
    let take = true
    let c = 0
    for await (const item of asyncIter(i)) {
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
