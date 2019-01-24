import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function * asyncDropWhile (func, iterable) {
  let drop = true
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!drop) {
      yield item
    } else {
      drop = await func(item, c++)
      if (!drop) {
        yield item
      }
    }
  }
}

export default curry(asyncDropWhile)
