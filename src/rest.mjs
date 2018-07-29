import ensureIterable from './internal/ensure-iterable'

export default function rest (iterable) {
  const iter = ensureIterable(iterable)[Symbol.iterator]()
  iter.next()
  return iter
}
