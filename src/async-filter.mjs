import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * filter (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (await func(item, c++)) {
      yield item
    }
  }
}

export default function curriedFilter (func, iterable) {
  if (arguments.length === 1) {
    return iterable => filter(func, iterable)
  }
  return filter(func, iterable)
}
