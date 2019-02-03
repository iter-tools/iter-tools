import map from './async-map'
import { curry } from './internal/curry'

async function * asyncFlatMap (func, iterable) {
  const mapIter = map(func)
  for await (const item of mapIter(iterable)) {
    yield * item
  }
}

export default curry(asyncFlatMap)
