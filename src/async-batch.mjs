import asyncIter from './async-iter'
export default function batch (number, iterable) {
  async function * curriedBatch (_iterable) {
    let batch = []
    for await (const item of asyncIter(_iterable)) {
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

  if (iterable) {
    return curriedBatch(iterable)
  }
  return curriedBatch
}
