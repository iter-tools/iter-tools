import { ensureIterable } from './internal/iterable'
import { curry } from './internal/curry'

function * takeWhile (func, i) {
  let take = true
  let c = 0
  for (const item of ensureIterable(i)) {
    take = func(item, c++)
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default curry(takeWhile)
