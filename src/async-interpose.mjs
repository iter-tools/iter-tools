import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function * asyncInterpose (interposeItem, iterable) {
  let first = true
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default curry(asyncInterpose)
