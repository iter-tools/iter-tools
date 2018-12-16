import ensureIterable from './internal/ensure-iterable'

function * interpose (interposeItem, iterable) {
  let first = true
  for (const item of ensureIterable(iterable)) {
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
