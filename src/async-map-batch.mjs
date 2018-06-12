import asyncBatch from './async-batch'
import map from './map'

export default function asyncMapBatch (number, func, iterable) {
  async function * curriedAsyncMapBatch (_iterable) {
    for await (const items of asyncBatch(number, _iterable)) {
      const results = await Promise.all(map(func, items))
      yield * results
    }
  }

  if (iterable) {
    return curriedAsyncMapBatch(iterable)
  }
  return curriedAsyncMapBatch
}
