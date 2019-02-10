import { asyncIterableCurry } from './internal/async-iterable'
import asyncBatch from './async-batch'

async function * asyncMap (concurrency = 1, func, iterable) {
  let c = 0
  for await (const items of asyncBatch(concurrency, iterable)) {
    const results = await Promise.all(items.map((item) => func(item, c++)))
    yield * results
  }
}

export default asyncIterableCurry(asyncMap, 2, 3)
