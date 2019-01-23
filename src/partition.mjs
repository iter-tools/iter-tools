import Dequeue from 'dequeue'
import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function partition (func, iter) {
  const satisfied = new Dequeue()
  const unsatisfied = new Dequeue()
  const iterator = ensureIterable(iter)[Symbol.iterator]()
  let exhausted = 0

  function * part (queue) {
    try {
      while (true) {
        while (queue.length) {
          yield queue.shift()
        }

        const { value, done } = iterator.next()
        if (done) break

        const chosen = func(value) ? satisfied : unsatisfied
        chosen.push(value)
      }
    } finally {
      exhausted++
      if (exhausted === 2) {
        if (typeof iterator.return === 'function') iterator.return()
      }
    }
  }

  return [part(satisfied), part(unsatisfied)]
}

export default curry(partition)
