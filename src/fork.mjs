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

  function * generateFork (a) {
    try {
      iterableCounter++
      yield 'ready' // the function generator is ready
      while (true) {
        if (!a.isEmpty()) {
          yield a.shift()
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
        // this first call to "next" allows to initiate the function generator
        // this ensures that "iterableCounter" will be always increased and decreased
        //
        // the default behaviour of a generator is that finally clause is only called
        // if next was called at least once
        fork.next()
        yield fork
      }
    } finally {
      noNewIterables = true
      returnIterator()
    }
  }

  return generateForks()
}
