import { iterableCurry } from './internal/iterable'

function * batch (number, iterable) {
  let batch = []
  for (const item of iterable) {
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

export default iterableCurry(batch)
