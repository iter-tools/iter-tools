import { iterableCurry } from './internal/iterable'

function * interpose (interposeItem, iterable) {
  let first = true
  for (const item of iterable) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default iterableCurry(interpose)
