import ensureIterable from './internal/ensure-iterable'
import CircularBuffer from './internal/circular-buffer'

function * cursor (size, iterable) {
  const circular = new CircularBuffer(size)
  for (const item of ensureIterable(iterable)) {
    circular.push(item)
    yield Array.from(circular)
  }
}

export default function curriedCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => cursor(size, iterable)
  }
  return cursor(size, iterable)
}
