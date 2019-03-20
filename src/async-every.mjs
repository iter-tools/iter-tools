import { asyncIterableCurry } from './internal/async-iterable'

async function asyncEvery (func, iterable) {
  let c = 0
  for await (const item of iterable) {
    if (!(await func(item, c++))) {
      return false
    }
  }
  return true
}

export default asyncIterableCurry(asyncEvery, {reduces: true})
