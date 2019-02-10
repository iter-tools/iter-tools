import asyncBatch from './async-batch'
import zip from './zip'
import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncFilter (concurrency = 1, func, iterable) {
  let c = 0
  for await (const items of asyncBatch(concurrency, iterable)) {
    const filters = await Promise.all(items.map((item) => func(item, c++)))
    for (const [item, canYield] of zip(items, filters)) {
      if (canYield) yield item
    }
  }
}

export default asyncIterableCurry(asyncFilter, 2, 3)
