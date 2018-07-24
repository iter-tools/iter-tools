import ensureAsyncIterable from './internal/ensure-async-iterable'

async function some (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (func(item, c++)) {
      return true
    }
  }
  return false
}

export default function curriedSome (func, iterable) {
  if (!iterable) {
    return iterable => some(func, iterable)
  }

  return some(func, iterable)
}
