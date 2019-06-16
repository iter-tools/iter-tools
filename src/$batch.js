import { $async, $await } from '../generate/async.macro'

import { $iterableCurry } from './internal/$iterable'

$async; function * $batch (number, iterable) {
  if (typeof number !== 'number' || number < 1) throw new Error('batch size should be a number, greater than zero')
  let batch = []
  $await; for (const item of iterable) {
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

export default $iterableCurry($batch)
