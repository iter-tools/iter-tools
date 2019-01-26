import ensureIterable from './internal/ensure-iterable'
import { Exchange } from './internal/queues'

export default function * fork (iterable) {
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
