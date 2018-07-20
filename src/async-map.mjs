import asyncIter from './internal/async-iter'

async function * map (func, iterable) {
  let c = 0
  for await (const item of asyncIter(iterable)) {
    yield func(item, c++)
  }
}

export default function curriedMap (func, iterable) {
  if (!iterable) {
    return iterable => map(func, iterable)
  }
  return map(func, iterable)
}
