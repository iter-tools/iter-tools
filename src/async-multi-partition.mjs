import { Queue, fakeQueue } from './internal/queues'
import { asyncIterableCurry } from './internal/async-iterable'

function * asyncMultiPartition (func, iter) {
  const queues = []
  let maxQueues = Infinity
  let queueNumber = 0
  const iterator = iter[Symbol.asyncIterator]()
  let exhausted = 0

  async function returnIterator () {
    if (exhausted === maxQueues) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  async function * part (queueId) {
    yield 'ready'
    queues[queueId] = queues[queueId] || new Queue()
    try {
      while (true) {
        while (!queues[queueId].isEmpty()) {
          yield queues[queueId].shift()
        }

        const { value, done } = await iterator.next()
        if (done) break

        const chosen = await func(value)
        if (chosen < maxQueues) { // throw away item if queue doesn't exist
          queues[chosen] = queues[chosen] || new Queue()
          queues[chosen].push(value)
        }
      }
    } finally {
      queues[queueId] = fakeQueue // /dev/null
      exhausted++
      await returnIterator()
    }
  }

  try {
    while (true) {
      const iter = part(queueNumber++)
      // this ensure to call the finally clause of iter
      iter.next()
      yield iter
    }
  } finally {
    // I trim the number of queues
    queues.length = maxQueues = queueNumber
    returnIterator()
  }
}

export default asyncIterableCurry(asyncMultiPartition)
