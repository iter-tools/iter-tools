import { asyncIterableCurry } from './internal/async-iterable'

async function asyncSome (func, iterable) {
  let c = 0
  for await (const item of iterable) {
    if ((await func(item, c++))) {
      return true
    }
  }
  return false
}

export default asyncIterableCurry(asyncSome, {reduces: true})
