import { $isAsync, $async, $await, $iteratorSymbol } from '../generate/async.macro'

import { Queue, fakeQueue } from './internal/queues'
import { $iterableCurry } from './internal/$iterable'

function * $multiPartition (func, iter) {
  const queues = []
  let maxQueues = Infinity
  let queueNumber = 0
  const iterator = iter[$iteratorSymbol]()
  let exhausted = 0

  $async; function returnIterator () {
    if (exhausted === maxQueues) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  $async; function * part (queueId) {
    yield 'ensure finally'
    queues[queueId] = queues[queueId] || new Queue()
    try {
      while (true) {
        while (!queues[queueId].isEmpty()) {
          yield queues[queueId].shift()
        }

        const { value, done } = $await(iterator.next())
        if (done) {
          if ($isAsync) {
            // given that the previous happens asynchronously
            // some other iterator might have populated the queue
            // so I have to flush it, before consider this done
            while (!queues[queueId].isEmpty()) {
              yield queues[queueId].shift()
            }
          }
          break
        }

        const chosen = $await(func(value))
        if (chosen < maxQueues) { // throw away item if queue doesn't exist
          queues[chosen] = queues[chosen] || new Queue()
          queues[chosen].push(value)
        }
      }
    } finally {
      queues[queueId] = fakeQueue // /dev/null
      exhausted++
      $await(returnIterator())
    }
  }

  try {
    while (true) {
      const iter = part(queueNumber++)
      iter.next() // ensure finally
      yield iter
    }
  } finally {
    // I trim the number of queues
    queues.length = maxQueues = queueNumber
    returnIterator()
  }
}

export default $iterableCurry($multiPartition, { forceSync: true })
