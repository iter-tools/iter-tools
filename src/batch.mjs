import ensureIterable from './internal/ensure-iterable'

function * batch (number, iterable) {
  let batch = []
  for (const item of ensureIterable(iterable)) {
    batch.push(item)
    if (batch.length === number) {
      yield batch
      batch = []
    }
  }
  if (batch.length) {
    yield batch
  }
}

export default function curriedBatch (number, iterable) {
  if (!iterable) {
    return iterable => batch(number, iterable)
  }
  return batch(number, iterable)
}
