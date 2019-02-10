import { asyncIterableCurry } from './internal/async-iterable'
import { Queue } from './internal/queues'

async function * asyncBuffer (bufferSize, iterable) {
  if (typeof bufferSize !== 'number' || bufferSize <= 0) {
    throw new Error('The first argument (bufferSize) should be a number greater than 0')
  }
  const iterator = iterable[Symbol.asyncIterator]()
  const buffer = new Queue()
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

export default asyncIterableCurry(asyncBuffer)
