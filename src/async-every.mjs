import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

async function asyncEvery (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!(await func(item, c++))) {
      return false
    }
  }
  return true
}

export default curry(asyncEvery)
