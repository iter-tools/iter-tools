import ensureAsyncIterable from './internal/ensure-async-iterable'
import { Exchange } from './internal/queues'
import range from './range'
import map from './map'

const deprecationWarning = 'ayncTee() is deprecated! Use asyncFork() instead'

let warnedDeprecation = false

export default function tee (iterable, number) {
  !warnedDeprecation && console.warn(deprecationWarning)
  warnedDeprecation = true

  number = number || 2
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
  let exhausted = 0
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

  async function * teeGen (a) {
    try {
      while (true) {
        if (!a.isEmpty()) {
          yield a.shift()
        } else if (done) {
          return
        } else {
          await fetch()
        }
      }
    } finally {
      exhausted++
      if (exhausted === number) {
        if (typeof iterator.return === 'function') await iterator.return()
      }
    }
  }
  const array = Array.from(map(() => teeGen(exchange.spawnConsumer()), range(number)))
  exchange.noMoreConsumers()
  return array
}

tee._silenceDeprecation = () => (warnedDeprecation = true)
