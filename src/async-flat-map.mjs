import map from './async-map'
import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncFlatMap (concurrency = 1, func, iterable) {
  const mapIter = map(func)
  for await (const item of mapIter(iterable)) {
    yield * item
  }
}

export default asyncIterableCurry(asyncFlatMap, { variadic: false, minArgs: 1, maxArgs: 2 })
