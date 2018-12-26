import ensureIterable from './internal/ensure-iterable'

export default function size (iterable) {
  if (Array.isArray(iterable)) return iterable.length
  if (iterable instanceof Map || iterable instanceof Set) return iterable.size
  let size = 0
  // eslint-disable-next-line
  for (const _ of ensureIterable(iterable)) {
    size++
  }
  return size
}
