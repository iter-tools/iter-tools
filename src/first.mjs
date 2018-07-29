import ensureIterable from './internal/ensure-iterable'

export default function first (iterable) {
  const iter = ensureIterable(iterable)[Symbol.iterator]()
  const firstItem = iter.next()
  return firstItem.value
}
