import Dequeue from 'dequeue'
import iterable from './iterable'

function uncurried (func, iter) {
  const satisfied = new Dequeue()
  const unsatisfied = new Dequeue()
  const iterator = iterable(iter)[Symbol.iterator]()

  function * part (queue) {
    while (true) {
      while (queue.length) {
        yield queue.shift()
      }

      const { value, done } = iterator.next()
      if (done) break

      const chosen = func(value) ? satisfied : unsatisfied
      chosen.push(value)
    }
  }

  return [part(satisfied), part(unsatisfied)]
}

const curried = func => iter => uncurried(func, iter)

export default function partition (func, iter) {
  return iter === undefined ? curried(func) : uncurried(func, iter)
}
