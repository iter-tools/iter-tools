import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (!drop) {
      yield item
    } else {
      drop = func(item, c++)
      if (!drop) {
        yield item
      }
    }
  }
}

export default curry(dropWhile)
