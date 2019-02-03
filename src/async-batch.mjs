import { ensureAsyncIterable } from './internal/async-iterable'
import { curry } from './internal/curry'

async function * asyncBatch (number, iterable) {
  if (typeof number !== 'number' || number < 1) throw new Error('batch size should be a number, greater than zero')
  let batch = []
  for await (const item of ensureAsyncIterable(iterable)) {
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

export default curry(asyncBatch)
