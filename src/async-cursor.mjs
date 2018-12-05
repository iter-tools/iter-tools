import ensureAsyncIterable from './internal/ensure-async-iterable'
import CircularBuffer from './internal/circular-buffer'

async function * asyncCursor (size, iterable) {
  const circular = new CircularBuffer(size)
  for await (const item of ensureAsyncIterable(iterable)) {
    circular.push(item)
    yield Array.from(circular)
  }
}

export default function curriedAsyncCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => asyncCursor(size, iterable)
  }
  return asyncCursor(size, iterable)
}
