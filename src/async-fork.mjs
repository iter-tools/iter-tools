import ensureAsyncIterable from './internal/ensure-async-iterable'
import { Exchange } from './internal/queues'
import slice from './slice'

function asyncFork (number, iterable) {
  const iterator = ensureAsyncIterable(iterable)[Symbol.iterator]()

  let iterableNumber = 0
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
    if (noNewIterables && iterableNumber === 0) {
      if (typeof iterator.return === 'function') await iterator.return()
    }
  }

  async function * generateFork (a) {
    try {
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
      iterableNumber--
      await returnIterator()
    }
  }

  function * generateForks () {
    try {
      while (true) {
        iterableNumber++
        yield generateFork(exchange.spawnConsumer())
      }
    } finally {
      noNewIterables = true
      exchange.noMoreConsumers()
      returnIterator()
    }
  }

  if (typeof number === 'number') {
    return Array.from(slice(number, generateForks()))
  }
  return generateForks()
}

export default function curriedAsyncFork (...args) {
  if (args.length === 1 && typeof args[0] === 'number') {
    return iterable => asyncFork(args[0], iterable)
  }
  if (args.length === 1 && typeof args[0] !== 'number') {
    return asyncFork(undefined, args[0])
  }
  if (args.length === 2) {
    return asyncFork(args[0], args[1])
  }
  return curriedAsyncFork
}
