import { iterableCurry } from './internal/iterable'

function every (func, iterable) {
  let c = 0
  for (const item of iterable) {
    if (!func(item, c++)) {
      return false
    }
  }
  return true
}

export default iterableCurry(every, { reduces: true })
