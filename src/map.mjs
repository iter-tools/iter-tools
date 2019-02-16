import { iterableCurry } from './internal/iterable'

function * map (func, iterable) {
  let c = 0
  for (const item of iterable) {
    yield func(item, c++)
  }
}

export default iterableCurry(map)
