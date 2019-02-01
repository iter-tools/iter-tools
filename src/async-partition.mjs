import { Queue, fakeQueue } from './internal/queues'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

const SATISFIED = 0
const UNSATISFIED = 1

function asyncPartition (func, iter) {
  const queues = [new Queue(), new Queue()]
  const iterator = ensureAsyncIterable(iter)[Symbol.asyncIterator]()
  let exhausted = 0

  async function * part (queueId) {
    try {
      while (true) {
        while (!queues[queueId].isEmpty()) {
          yield queues[queueId].shift()
        }

        const { value, done } = await iterator.next()
        if (done) break

        const chosen = (await func(value)) ? SATISFIED : UNSATISFIED
        queues[chosen].push(value)
      }
    } finally {
      queues[queueId] = fakeQueue // /dev/null
      exhausted++
      if (exhausted === 2) {
        if (typeof iterator.return === 'function') await iterator.return()
      }
    }
  }

  return [part(SATISFIED), part(UNSATISFIED)]
}

export default curry(asyncPartition)
