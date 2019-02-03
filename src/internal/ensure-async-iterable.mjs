import asyncify from './asyncify'
import ensureIterable from './ensure-iterable'

export default function ensureAsyncIterable (i) {
  if (i && i[Symbol.asyncIterator]) {
    return i
  } else {
    return asyncify(ensureIterable(i))
  }
}
