import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * map (func, iterable) {
  let c = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    yield (await func(item, c++))
  }
}

export default function curriedMap (func, iterable) {
  if (arguments.length === 1) {
    return iterable => map(func, iterable)
  }
  return map(func, iterable)
}
