import { iterableCurry } from './internal/iterable'

function consume (func = () => {}, iterable) {
  let c = 0
  for (const item of iterable) {
    func(item, c++)
  }
}

export default iterableCurry(consume, { variadic: false, reduces: true, minArgs: 0, maxArgs: 1 })
