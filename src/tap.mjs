import { iterableCurry } from './internal/iterable'

function * tap (func, iterable) {
  let c = 0
  for (const item of iterable) {
    func(item, c++)
    yield item
  }
}

export default iterableCurry(tap)
