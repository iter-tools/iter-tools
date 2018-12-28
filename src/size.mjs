import ensureIterable from './internal/ensure-iterable'

const TypedArray = Object.getPrototypeOf(Int8Array)

export default function size (iterable) {
  if (Array.isArray(iterable)) return iterable.length
  if (iterable instanceof Map || iterable instanceof Set) return iterable.size
  if (Object.getPrototypeOf(iterable) === TypedArray) return iterable.length
  let size = 0
  // eslint-disable-next-line
  for (const _ of ensureIterable(iterable)) {
    size++
  }
  return size
}
