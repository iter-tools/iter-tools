import ensureIterable from './internal/ensure-iterable'
import { Exchange } from './internal/queues'
import slice from './slice'

function fork (number, iterable) {
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

  let iterableNumber = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false

  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
    } else {
      exchange.push(newItem.value)
    }
  }

  function returnIterator () {
    if (noNewIterables && iterableNumber === 0) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  function * forkGen (a) {
    try {
      while (true) {
        if (!a.isEmpty()) {
          yield a.shift()
        } else if (done) {
          return
        } else {
          fetch()
        }
      }
    } finally {
      iterableNumber--
      returnIterator()
    }
  }

  function * generateForks () {
    try {
      while (true) {
        iterableNumber++
        yield forkGen(exchange.spawnConsumer())
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

export default function curriedFork (...args) {
  if (args.length === 1 && typeof args[0] === 'number') {
    return iterable => fork(args[0], iterable)
  }
  if (args.length === 1 && typeof args[0] !== 'number') {
    return fork(undefined, args[0])
  }
  if (args.length === 2) {
    return fork(args[0], args[1])
  }
  return curriedFork
}
