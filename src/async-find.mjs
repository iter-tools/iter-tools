import ensureAsyncIterable from './internal/ensure-async-iterable'

async function find (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if ((await func(item, c++))) {
      return item
    }
  }
  return null
}

export default function curriedFind (func, iterable) {
  if (arguments.length === 1) {
    return iterable => find(func, iterable)
  }
  return find(func, iterable)
}
