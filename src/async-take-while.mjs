import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * takeWhile (func, iterable) {
  let take = true
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
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
