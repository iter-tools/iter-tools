import asyncify from './asyncify'
import isAsyncIterable from './is-async-iterable'
import ensureIterable from './ensure-iterable'

export default function ensureAsyncIterable (i) {
  if (isAsyncIterable(i)) {
    return i
  } else {
    return asyncify(ensureIterable(i))
  }
}
