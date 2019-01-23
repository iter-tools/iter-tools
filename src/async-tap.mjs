import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function * asyncTap (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    await func(item, c++)
    yield item
  }
}

export default curry(asyncTap)
