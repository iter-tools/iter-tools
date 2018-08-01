import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * dropWhile (func, iterable) {
  let drop = true
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    if (!drop) {
      yield item
    } else {
      drop = func(item, c++)
      if (!drop) {
        yield item
      }
    }
  }
}

export default function curriedDropWhile (func, iterable) {
  if (arguments.length === 1) {
    return iterable => dropWhile(func, iterable)
  }
  return dropWhile(func, iterable)
}
