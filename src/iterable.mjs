import ensureIterable from './internal/ensure-iterable'
import isIterable from './internal/is-iterable'

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
