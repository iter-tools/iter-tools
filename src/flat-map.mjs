import { iterableCurry } from './internal/iterable'
import map from './map'

function * flatMap (func, iterable) {
  const mapIter = map(func)
  for (const item of mapIter(iterable)) {
    yield * item
  }
}

export default iterableCurry(flatMap)
