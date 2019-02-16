import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncTakeWhile (func, iterable) {
  let take = true
  let c = 0
  for await (const item of iterable) {
    take = await func(item, c++)
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default asyncIterableCurry(asyncTakeWhile)
