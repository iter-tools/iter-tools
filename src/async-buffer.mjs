import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'
import Dequeue from 'dequeue'

async function * asyncBuffer (bufferSize, iterable) {
  const iterator = ensureAsyncIterable(iterable, true)[Symbol.asyncIterator]()
  const buffer = new Dequeue()
  try {
    // fill buffer
    for (let i = 0; i < bufferSize; i++) {
      buffer.push(iterator.next())
    }
    while (true) {
      buffer.push(iterator.next())
      const { done, value } = await buffer.shift()
      if (done) return
      yield value
    }
  } finally {
    if (typeof iterator.return === 'function') await iterator.return()
  }
}

export default curry(asyncBuffer)
