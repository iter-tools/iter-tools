import range from './range'
import map from './map'
import ensureIterable from './internal/ensure-iterable'
import Dequeue from 'dequeue'

export default function tee (iterable, number) {
  number = number || 2
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

  let exhausted = 0
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false

  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
    } else {
      arrays.forEach((ar) => ar.push(newItem.value))
    }
  }

  function * teeGen (a) {
    try {
      while (true) {
        if (a.length) {
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
  return arrays.map((a) => teeGen(a))
}
