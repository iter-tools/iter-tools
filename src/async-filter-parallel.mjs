import { asyncIterableCurry } from './internal/async-iterable'
import ParallelRunner from './internal/parallel-runner'

async function * asyncFilterParallel (concurrency = 4, func, iterable) {
  let c = 0

  const mapped = new ParallelRunner(iterable, async item => ({ item, value: await func(item, c++) }), concurrency)

  for await (const item of mapped) {
    if (item.value) {
      yield item.item
    }
  }
}

export default asyncIterableCurry(asyncFilterParallel, { minArgs: 1, maxArgs: 2 })
