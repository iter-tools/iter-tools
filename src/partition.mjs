import { Queue, fakeQueue } from './internal/queues'
import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

const SATISFIED = 0
const UNSATISFIED = 1

function partition (func, iter) {
  const queues = [new Queue(), new Queue()]
  const iterator = ensureIterable(iter)[Symbol.iterator]()
  let exhausted = 0

  function * part (queueId) {
    try {
      while (true) {
        while (!queues[queueId].isEmpty()) {
          yield queues[queueId].shift()
        }

        const { value, done } = iterator.next()
        if (done) break

        const chosen = func(value) ? SATISFIED : UNSATISFIED
        queues[chosen].push(value)
      }
    } finally {
      queues[queueId] = fakeQueue // /dev/null
      exhausted++
      if (exhausted === 2) {
        if (typeof iterator.return === 'function') iterator.return()
      }
    }
  }

  return [part(SATISFIED), part(UNSATISFIED)]
}

export default curry(partition)
