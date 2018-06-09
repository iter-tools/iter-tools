import asyncBatch from './async-batch'

export default function asyncMapBatch(number, func, iterable) {
  async function * curriedAsyncMapBatch (_iterable) {
    for await (const items of asyncBatch(number, _iterable)) {
      const results = await Promise.all(items.map(func))
      yield * results
    }
  }

  if (iterable) {
    return curriedAsyncMapBatch(iterable)
  }
  return curriedAsyncMapBatch
}
