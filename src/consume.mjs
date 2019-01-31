import { iterableCurry } from './internal/iterable'

function consume (func = () => {}, iterable) {
  let c = 0
  for (const item of iterable) {
    func(item, c++)
  }
}

export default iterableCurry(consume, false, 0, 1)
