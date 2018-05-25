import range from '../range'
import map from '../map'
import asyncIter from './async-iter'
import Dequeue from 'dequeue'

export default function tee (iterable, number) {
  number = number || 2
  iterable = asyncIter(iterable)
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false
  async function * teeGen (a) {
    let newItem
    while (true) {
      if (a.length) {
        yield a.shift()
      } else {
        if (done) {
          return
        }
        newItem = await iterable.next()
        if (newItem.done) {
          done = true
          return
        } else {
          arrays.forEach((ar) => ar.push(newItem.value))
          yield a.shift()
        }
      }
    }
  }
  return arrays.map((a) => teeGen(a))
}
