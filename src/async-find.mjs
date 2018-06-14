import asyncIter from './async-iter'

export default function find (func, iterable) {
  async function curriedFind (i) {
    let c = 0
    for await (const item of asyncIter(i)) {
      if (func(item, c++)) {
        return item
      }
    }
    return null
  }
  if (iterable) {
    return curriedFind(iterable)
  }
  return curriedFind
}
