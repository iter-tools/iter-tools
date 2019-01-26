import ensureIterable from './internal/ensure-iterable'
import { Exchange } from './internal/queues'
import range from './range'
import map from './map'

export default function tee (iterable, number) {
  number = number || 2
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

  let exhausted = 0
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

  function * teeGen (a) {
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
      exhausted++
      if (exhausted === number) {
        if (typeof iterator.return === 'function') iterator.return()
      }
    }
  }
  const array = Array.from(map(() => teeGen(exchange.spawnConsumer()), range(number)))
  exchange.noMoreConsumers()
  return array
}
