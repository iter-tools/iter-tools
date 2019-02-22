import { ensureIterable } from './internal/iterable'
import { Exchange } from './internal/queues'
import range from './range'
import map from './map'

const deprecationWarning = 'tee() is deprecated! Use fork() instead'

let warnedDeprecation = false

export default function tee (iterable, number) {
  !warnedDeprecation && console.warn(deprecationWarning)
  warnedDeprecation = true
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
  const consumer = exchange.getConsumer()
  const array = Array.from(map(() => teeGen(consumer.clone()), range(number)))
  return array
}

tee._silenceDeprecation = () => (warnedDeprecation = true)
