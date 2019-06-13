/**
 * @generated-from ./$batch.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from './internal/async-iterable'

async function * batch (number, iterable) {
  if (typeof number !== 'number' || number < 1) throw new Error('batch size should be a number, greater than zero')
  let batch = []

  for await (const item of iterable) {
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
