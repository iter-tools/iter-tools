import { ensureIterable } from './internal/iterable'

export default function toArray (iterable) {
  return Array.from(ensureIterable(iterable))
}
