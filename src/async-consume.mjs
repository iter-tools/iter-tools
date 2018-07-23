import ensureAsyncIterable from './internal/ensure-async-iterable'

async function consume (func, iterable) {
  for await (const item of ensureAsyncIterable(iterable)) {
    func(item)
  }
}

export default function curriedConsume (func, iterable) {
  if (!iterable) {
    return iterable => consume(func, iterable)
  }

  return consume(func, iterable)
}
