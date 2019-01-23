import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function * asyncTakeWhile (func, iterable) {
  let take = true
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    take = await func(item, c++)
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default curry(asyncTakeWhile)
