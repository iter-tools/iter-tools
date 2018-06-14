import asyncIter from './async-iter'

async function * takeWhile (func, iterable) {
  let take = true
  let c = 0
  for await (const item of asyncIter(iterable)) {
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
