import AdvancedMapInitialized from 'advanced-map-initialized'
import Dequeue from 'dequeue'
import ensureIterable from './internal/ensure-iterable'
import partitionPart from './internal/partition-part'

function multiPartitionMap (func, iter) {
  const queueMap = new AdvancedMapInitialized(Map, () => new Dequeue())
  const iterator = ensureIterable(iter)[Symbol.iterator]()

  const part = queue => partitionPart(
    iterator,
    queue,
    value => queueMap.get(func(value)),
    () => queueMap.data.size
  )

  const partMap = new AdvancedMapInitialized(Map, index => part(queueMap.get(index)))

  return {
    get: value => partMap.get(value)
  }
}

export default function curriedMultiPartitionMap (func, iter) {
  if (typeof iter === 'undefined') {
    return iter => multiPartitionMap(func, iter)
  }
  return multiPartitionMap(func, iter)
}
