import Dequeue from 'dequeue'
import ensureAsyncIterable from './internal/ensure-async-iterable'

function partition (func, iter) {
  const satisfied = new Dequeue()
  const unsatisfied = new Dequeue()
  const iterator = ensureAsyncIterable(iter)[Symbol.asyncIterator]()
  let exhausted = 0

  async function * part (queue) {
    try {
      while (true) {
        while (queue.length) {
          yield queue.shift()
        }

        const { value, done } = await iterator.next()
        if (done) break

        const chosen = (await func(value)) ? satisfied : unsatisfied
        chosen.push(value)
      }
    } finally {
      exhausted++
      if (exhausted === 2) {
        if (typeof iterator.return === 'function') await iterator.return()
      }
    }
  }

  return [part(satisfied), part(unsatisfied)]
}

export default function curriedPartition (func, iter) {
  if (typeof iter === 'undefined') {
    return iter => partition(func, iter)
  }
  return partition(func, iter)
}
