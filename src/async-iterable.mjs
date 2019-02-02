import ensureAsyncIterable from './internal/ensure-async-iterable'
import isIterable from './internal/is-iterable'
import isAsyncIterable from './internal/is-async-iterable'

export default function asyncIterable (asyncIterator) {
  if (asyncIterator !== null &&
    typeof asyncIterator === 'object' &&
    !isIterable(asyncIterator) &&
    !isAsyncIterable(asyncIterator) &&
    typeof asyncIterator.next === 'function') {
    return {
      [Symbol.asyncIterator] () {
        return asyncIterator
      }
    }
  } else {
    return ensureAsyncIterable(asyncIterator)
  }
}
