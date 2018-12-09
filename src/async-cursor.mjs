import asyncEnumerate from './async-enumerate'
import CircularBuffer from './internal/circular-buffer'

async function * asyncCursor (size, iterable) {
  const circular = new CircularBuffer(size)
  let yielded = false
  for await (const [index, item] of asyncEnumerate(iterable)) {
    circular.push(item)
    if (index + 1 >= size) {
      yield Array.from(circular)
    }
  }
  if (!yielded) {
    yield Array.from(circular)
  }
}

export default function curriedAsyncCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => asyncCursor(size, iterable)
  }
  return asyncCursor(size, iterable)
}
