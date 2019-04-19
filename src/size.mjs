import { ensureIterable } from './internal/iterable'

const TypedArrayProto = Object.getPrototypeOf(Int8Array)

export default function size (iterable) {
  const iter = ensureIterable(iterable)
  console.log(iter)
  if (Array.isArray(iter)) return iter.length
  if (iter instanceof Map || iter instanceof Set) return iter.size
  if (Object.getPrototypeOf(iter) === TypedArrayProto) return iter.length
  let size = 0
  // eslint-disable-next-line
  for (const _ of iter) {
    size++
  }
  return size
}
