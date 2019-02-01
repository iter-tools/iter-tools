import ensureAsyncIterable from './internal/ensure-async-iterable'
import { Exchange } from './internal/queues'

export default function asyncFork (iterable) {
  const iterator = ensureAsyncIterable(iterable)[Symbol.iterator]()

  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false
  let doneValue

  function fetch () {
    return new Promise((resolve, reject) => {
      iterator.next()
        .then((newItem) => {
          if (newItem.done) {
            done = true
            doneValue = newItem.value
            return resolve()
          } else {
            exchange.push(newItem.value)
            return resolve()
          }
        })
        .catch((err) => reject(err))
    })
  }

  async function returnIterator () {
    if (noNewIterables && iterableCounter === 0) {
      if (typeof iterator.return === 'function') await iterator.return()
    }
  }

  async function * generateFork (a) {
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
      await returnIterator()
    }
  }

  function * generateForks () {
    try {
      while (true) {
        const fork = generateFork(exchange.spawnConsumer())
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
      exchange.noMoreConsumers()
      returnIterator()
    }
  }

  return generateForks()
}
