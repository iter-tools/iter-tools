import { ensureAsyncIterable } from './internal/async-iterable'
import { curry } from './internal/curry'

async function asyncFind (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if ((await func(item, c++))) {
      return item
    }
  }
  return undefined
}

export default curry(asyncFind)
