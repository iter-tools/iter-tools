import ensureAsyncIterable from './internal/ensure-async-iterable'
import Dequeue from 'dequeue'

async function * asyncBuffer (maxSize, iterable) {
  const buffer = new Dequeue()
  let currentSize = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    buffer.push(item)
    currentSize++
    if (currentSize > maxSize) {
      yield buffer.shift()
      currentSize--
    }
  }
  for (let i = 0; i < currentSize; i++) {
    yield buffer.shift()
  }
}

export default function asyncBufferCurried (maxSize, iterable) {
  if (arguments.length === 1) {
    return iterable => asyncBuffer(maxSize, iterable)
  }

  return asyncBuffer(maxSize, iterable)
}
