import range from './range'
import map from './map'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import Dequeue from 'dequeue'

export default function tee (iterable, number) {
  number = number || 2
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
  let exhausted = 0
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false

  function fetch () {
    return new Promise((resolve, reject) => {
      iterator.next()
        .then((newItem) => {
          if (newItem.done) {
            done = true
            return resolve()
          } else {
            arrays.forEach((ar) => ar.push(newItem.value))
            return resolve()
          }
        })
        .catch((err) => reject(err))
    })
  }

  async function * teeGen (a) {
    try {
      while (true) {
        if (a.length) {
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
  return arrays.map((a) => teeGen(a))
}
