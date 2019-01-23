import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function * filter (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (func(item, c++)) {
      yield item
    }
  }
}

export default curry(filter)
