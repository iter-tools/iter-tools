import asyncBatch from './async-batch'
import map from './map'

async function * asyncMapBatch (number, func, iterable) {
  for await (const items of asyncBatch(number, iterable)) {
    const results = await Promise.all(map(func, items))
    yield * results
  }
}

export default function curriedAsyncMapBatch (number, func, iterable) {
  if (!iterable) {
    return iterable => asyncMapBatch(number, func, iterable)
  }
  return asyncMapBatch(number, func, iterable)
}
