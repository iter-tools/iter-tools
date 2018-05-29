import asyncIter from './async-iter'

export default function map (func, iterable) {
  async function * curriedMap (i) {
    let c = 0
    for await (const item of asyncIter(i)) {
      yield func(item, c++)
    }
  }
  if (iterable) {
    return curriedMap(iterable)
  }
  return curriedMap
}
