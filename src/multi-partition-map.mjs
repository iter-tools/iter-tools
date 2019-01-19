import AdvancedMapInitialized from 'advanced-map-initialized'
import Dequeue from 'dequeue'
import ensureIterable from './internal/ensure-iterable'

function uncurried (func, iter) {
  const queueMap = new AdvancedMapInitialized(Map, () => new Dequeue())
  const iterator = ensureIterable(iter)[Symbol.iterator]()

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

  const partMap = new AdvancedMapInitialized(Map, index => part(queueMap.get(index)))

  return {
    get: value => partMap.get(value)
  }
}

const curried = func => iter => uncurried(func, iter)

export default function multiPartitionMap (func, iter) {
  return iter === undefined ? curried(func) : uncurried(func, iter)
}
