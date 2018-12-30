import ensureAsyncIterable from './internal/ensure-async-iterable'

async function consume (func, iterable) {
  for await (const item of ensureAsyncIterable(iterable)) {
    await func(item)
  }
}

export default function curriedConsume (func, iterable) {
  if (arguments.length === 1) {
    return iterable => consume(func, iterable)
  }

  return consume(func, iterable)
}
