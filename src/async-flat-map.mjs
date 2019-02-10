import map from './async-map'
import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncFlatMap (func, iterable) {
  const mapIter = map(func)
  for await (const item of mapIter(iterable)) {
    yield * item
  }
}

export default asyncIterableCurry(asyncFlatMap)
