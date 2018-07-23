import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * tap (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
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
