import asyncMap from './async-map'
import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncFilter (concurrency, func, iterable) {
  if (concurrency == null) {
    concurrency = 1
  }

  let c = 0

  const mapped = asyncMap(concurrency, async item => ({ item, value: await func(item, c++) }), iterable)

  for await (const item of mapped) {
    if (item.value) {
      yield item.item
    }
  }
}

export default asyncIterableCurry(asyncFilter, false, 1, 2)
