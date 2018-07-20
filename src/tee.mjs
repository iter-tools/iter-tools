import range from './range'
import map from './map'
import iter from './internal/iter'
import Dequeue from 'dequeue'

export default function tee (iterable, number) {
  number = number || 2
  iterable = iter(iterable)[Symbol.iterator]()
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false

  function fetch () {
    const newItem = iterable.next()
    if (newItem.done) {
      done = true
    } else {
      arrays.forEach((ar) => ar.push(newItem.value))
    }
  }

  function * teeGen (a) {
    while (true) {
      if (a.length) {
        yield a.shift()
      } else if (done) {
        return
      } else {
        fetch()
      }
    }
  }
  return arrays.map((a) => teeGen(a))
}
