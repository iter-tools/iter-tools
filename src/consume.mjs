import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function consume (func, iterable) {
  let c = 0
  for (const item of ensureIterable(iterable)) {
    func(item, c++)
  }
}

export default curry(consume)
