import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function asyncConsume (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    await func(item, c++)
  }
}

export default curry(asyncConsume)
