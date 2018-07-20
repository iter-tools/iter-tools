import asyncIter from './internal/async-iter'

async function * batch (number, iterable) {
  let batch = []
  for await (const item of asyncIter(iterable)) {
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
