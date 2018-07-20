import asyncIter from './internal/async-iter'

async function * filter (func, iterable) {
  let c = 0
  for await (const item of asyncIter(iterable)) {
    if (func(item, c++)) {
      yield item
    }
  }
}

export default function curriedFilter (func, iterable) {
  if (!iterable) {
    return iterable => filter(func, iterable)
  }
  return filter(func, iterable)
}
