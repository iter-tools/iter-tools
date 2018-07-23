import ensureIterable from './internal/ensure-iterable'

export default function size (iterable) {
  let size = 0
  // eslint-disable-next-line
  for (const _ of ensureIterable(iterable)) {
    size++
  }
  return size
}
