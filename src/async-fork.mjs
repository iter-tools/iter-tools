import { ensureAsyncIterable } from './internal/async-iterable'
import { Exchange } from './internal/queues'

function asyncFork (n = Infinity, iterable) {
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
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
      yield 'ensure finally'
      while (true) {
        if (!a.isEmpty()) {
          yield a.shift()
        } else if (done) {
          return doneValue
        } else {
          await fetch()
        }
      }
    } finally {
      iterableCounter--
      await returnIterator()
    }
  }

  function * generateForks () {
    try {
      const consumer = exchange.getConsumer()
      let counter = 0
      while (counter++ < n) {
        const fork = generateFork(consumer.clone())
        // this first call to "next" allows to initiate the function generator
        // this ensures that "iterableCounter" will be always increased and decreased
        //
        // the default behaviour of a generator is that finally clause is only called
        // if next was called at least once
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

export default function curriedAsyncFork (...args) {
  if (args.length === 2) {
    return asyncFork(...args)
  }

  if (args.length === 0) {
    return asyncFork
  }

  if (typeof args[0] === 'number') {
    return (...args2) => curriedAsyncFork(args[0], ...args2)
  }
  return asyncFork(undefined, args[0])
}
