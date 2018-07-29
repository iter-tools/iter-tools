import ensureIterable from './internal/ensure-async-iterable'

export default async function rest (iterable) {
  const iter = ensureIterable(iterable)[Symbol.asyncIterator]()
  await iter.next()
  return iter
}
