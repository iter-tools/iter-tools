import ensureIterable from './internal/ensure-async-iterable'

export default async function first (iterable) {
  const iter = ensureIterable(iterable)[Symbol.asyncIterator]()
  const firstItem = await iter.next()
  return firstItem.value
}
