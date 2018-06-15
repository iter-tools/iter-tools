import asyncIter from './async-iter'

async function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for await (const item of asyncIter(iterable)) {
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

export default function curriedDropWhile (func, iterable) {
  if (!iterable) {
    return iterable => dropWhile(func, iterable)
  }
  return dropWhile(func, iterable)
}
