import { iterableCurry } from './internal/iterable'

function some (func, iterable) {
  let c = 0
  for (const item of iterable) {
    if (func(item, c++)) {
      return true
    }
  }
  return false
}

export default iterableCurry(some, { reduces: true })
