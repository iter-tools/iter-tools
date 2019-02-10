import { iterableCurry } from './internal/iterable'

function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for (const item of iterable) {
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

export default iterableCurry(dropWhile)
