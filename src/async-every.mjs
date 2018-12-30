import ensureAsyncIterable from './internal/ensure-async-iterable'

async function every (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!(await func(item, c++))) {
      return false
    }
  }
  return true
}

export default function curriedEvery (func, iterable) {
  if (arguments.length === 1) {
    return iterable => every(func, iterable)
  }

  return every(func, iterable)
}
