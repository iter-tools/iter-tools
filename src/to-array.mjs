import ensureIterable from './internal/ensure-iterable'

export default function toArray (iterable) {
  return Array.from(ensureIterable(iterable))
}
