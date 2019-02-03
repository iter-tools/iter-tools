import { ensureIterable, isIterable } from './internal/iterable'

export default function iterable (iterator) {
  if (iterator !== null &&
    typeof iterator === 'object' &&
    !isIterable(iterator) &&
    typeof iterator.next === 'function') {
    return {
      [Symbol.iterator] () {
        return iterator
      }
    }
  } else {
    return ensureIterable(iterator)
  }
}
