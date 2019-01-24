import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function asyncConsume (func, iterable) {
  for await (const item of ensureAsyncIterable(iterable)) {
    await func(item)
  }
}

export default curry(asyncConsume)
