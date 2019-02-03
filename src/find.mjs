import { ensureIterable } from './internal/iterable'
import { curry } from './internal/curry'

function find (func, iterable) {
  let found = true
  let c = 0
  for (const item of ensureIterable(iterable)) {
    found = func(item, c++)
    if (found) {
      return item
    }
  }
  return undefined
}

export default curry(find)
