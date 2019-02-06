import { iterableCurry } from './internal/iterable'

function * filter (func, iterable) {
  let c = 0
  for (const item of iterable) {
    if (func(item, c++)) {
      yield item
    }
  }
}

export default iterableCurry(filter)
