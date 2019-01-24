import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

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

export default curry(batch)
