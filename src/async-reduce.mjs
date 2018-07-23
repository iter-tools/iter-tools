import ensureAsyncIterable from './internal/ensure-async-iterable'

async function reduce (func, iterable) {
  let c = 0
  let acc
  for await (const item of ensureAsyncIterable(iterable)) {
    acc = func(acc, item, c++)
  }
  return acc
}

export default function curriedReduce (func, iterable) {
  if (!iterable) {
    return iterable => reduce(func, iterable)
  }
  return reduce(func, iterable)
}
