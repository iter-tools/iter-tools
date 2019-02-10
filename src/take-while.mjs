import { iterableCurry } from './internal/iterable'

function * takeWhile (func, i) {
  let take = true
  let c = 0
  for (const item of i) {
    take = func(item, c++)
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default iterableCurry(takeWhile)
