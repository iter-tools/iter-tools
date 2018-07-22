import ensureAsyncIterable from './internal/ensure-async-iterable'

export default async function asyncToArray (iterable) {
  const out = []
  for await (const item of ensureAsyncIterable(iterable)) {
    out.push(item)
  }
  return out
}
