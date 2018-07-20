import asyncIter from './internal/async-iter'

async function * tap (func, iterable) {
  let c = 0
  for await (const item of asyncIter(iterable)) {
    func(item, c++)
    yield item
  }
}

export default function curriedTap (func, iterable) {
  if (!iterable) {
    return iterable => tap(func, iterable)
  }
  return tap(func, iterable)
}
