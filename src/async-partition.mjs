import { Queue, fakeQueue } from './internal/queues'
import { asyncIterableCurry } from './internal/async-iterable'

const SATISFIED = 0
const UNSATISFIED = 1

function asyncPartition (func, iter) {
  const queues = [new Queue(), new Queue()]
  const iterator = iter[Symbol.asyncIterator]()
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

export default asyncIterableCurry(asyncPartition)
