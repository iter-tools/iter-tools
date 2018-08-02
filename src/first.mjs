import slice from './slice'

export default function first (iterable) {
  return Array.from(slice(1, iterable))[0]
}
