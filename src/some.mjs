import { ensureIterable } from './internal/iterable'
import { curry } from './internal/curry'

function some (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    if (func(item, c++)) {
      return true
    }
  }
  return false
}

export default curry(some)
