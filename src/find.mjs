import { iterableCurry } from './internal/iterable'

function find (func, iterable) {
  let found = true
  let c = 0
  for (const item of iterable) {
    found = func(item, c++)
    if (found) {
      return item
    }
  }
  return undefined
}

export default iterableCurry(find, { reduces: true })
