import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function every (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (!func(item, c++)) {
      return false
    }
  }
  return true
}

export default curry(every)
