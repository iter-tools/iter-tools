import { asyncIterableCurry } from './internal/async-iterable'

async function asyncFind (func, iterable) {
  let c = 0
  for await (const item of iterable) {
    if ((await func(item, c++))) {
      return item
    }
  }
  return undefined
}

export default asyncIterableCurry(asyncFind, { reduces: true })
