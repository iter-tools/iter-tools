import asyncIter from './async-iter'

export default function dropWhile (func, iterable) {
  async function * curriedDropWhile (i) {
    let drop = true
    let c = 0
    for await (const item of asyncIter(i)) {
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
  if (iterable) {
    return curriedDropWhile(iterable)
  }
  return curriedDropWhile
}
