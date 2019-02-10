import { ensureAsyncIterable, isAsyncIterable } from './internal/async-iterable'
import { isIterable } from './internal/iterable'

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
