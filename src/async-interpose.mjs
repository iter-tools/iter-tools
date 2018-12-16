import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * interpose (interposeItem, iterable) {
  let first = true
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default function curriedInterpose (interposeItem, iterable) {
  if (arguments.length === 1) {
    return iterable => interpose(interposeItem, iterable)
  }
  return interpose(interposeItem, iterable)
}
