import { ensureIterable } from './internal/iterable'
import { Exchange } from './internal/queues'

export default function fork (iterable) {
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false
  let doneValue

  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
      doneValue = newItem.value
    } else {
      exchange.push(newItem.value)
    }
  }

  function returnIterator () {
    if (noNewIterables && iterableCounter === 0) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  function * generateFork (cons) {
    try {
      iterableCounter++
      yield 'ensure finally'
      while (true) {
        if (!cons.isEmpty()) {
          yield cons.shift()
        } else if (done) {
          return doneValue
        } else {
          fetch()
        }
      }
    } finally {
      iterableCounter--
      returnIterator()
    }
  }

  function * generateForks () {
    try {
      const consumer = exchange.getConsumer()
      while (true) {
        const fork = generateFork(consumer.clone())
        fork.next() // ensure finally
        yield fork
      }
    } finally {
      noNewIterables = true
      returnIterator()
    }
  }

  return generateForks()
}
