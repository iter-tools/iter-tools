import { ensureIterable } from './internal/iterable'
import { curry } from './internal/curry'

function * map (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    yield func(item, c++)
  }
}

export default curry(map)
