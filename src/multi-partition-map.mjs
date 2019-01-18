import AdvancedMapInitialized from 'advanced-map-initialized'
import Dequeue from 'dequeue'
import iterable from './iterable'

function uncurried (func, iter) {
  const queueMap = new AdvancedMapInitialized(Map, () => new Dequeue())
  const iterator = iterable(iter)[Symbol.iterator]()

  function * part (queue) {
    while (true) {
      while (queue.length) {
        yield queue.shift()
      }

      const { value, done } = iterator.next()
      if (done) break

      queueMap.get(func(value)).push(value)
    }
  }

  return new AdvancedMapInitialized(Map, index => part(queueMap.get(index)))
}

const curried = func => iter => uncurried(func, iter)

export default function multiPartitionMap (func, iter) {
  return iter === undefined ? curried(func) : uncurried(func, iter)
}
