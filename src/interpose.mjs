import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function * interpose (interposeItem, iterable) {
  let first = true
  for (const item of ensureIterable(iterable)) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default curry(interpose)
