import { ensureIterable } from './internal/iterable'
import { curry } from './internal/curry'

function * tap (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    func(item, c++)
    yield item
  }
}

export default curry(tap)
