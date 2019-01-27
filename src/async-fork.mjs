import ensureAsyncIterable from './internal/ensure-async-iterable'
import { Exchange } from './internal/queues'

export default function * asyncFork (iterable) {
  const iterator = ensureAsyncIterable(iterable)[Symbol.iterator]()

  let iterableNumber = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false

  function fetch () {
    return new Promise((resolve, reject) => {
      iterator.next()
        .then((newItem) => {
          if (newItem.done) {
            done = true
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

  async function * forkGen (a) {
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
      await returnIterator()
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
