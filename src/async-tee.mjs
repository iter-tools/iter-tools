import range from './range'
import map from './map'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import Dequeue from 'dequeue'

export default function tee (iterable, number) {
  number = number || 2
  iterable = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false

  function fetch () {
    return new Promise((resolve, reject) => {
      iterable.next()
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
    while (true) {
      if (a.length) {
        yield a.shift()
      } else if (done) {
        return
      } else {
        await fetch()
      }
    }
  }
  return arrays.map((a) => teeGen(a))
}
