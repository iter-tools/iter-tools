import asyncIter from './async-iter'

export default function filter (func, iterable) {
  async function * curriedFilter (i) {
    let c = 0
    for await (const item of asyncIter(i)) {
      if (func(item, c++)) {
        yield item
      }
    }
  }
  if (iterable) {
    return curriedFilter(iterable)
  }
  return curriedFilter
}
