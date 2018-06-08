import iter from './iter'
export default function batch (number, iterable) {
  function * curriedBatch (_iterable) {
    let batch = []
    for (const item of iter(_iterable)) {
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
