import { ensureAsyncIterable } from './internal/async-iterable'
import { curry } from './internal/curry'

async function asyncSome (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if ((await func(item, c++))) {
      return true
    }
  }
  return false
}

export default curry(asyncSome)
