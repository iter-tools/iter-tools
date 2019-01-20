import map from './map'
import multiPartitionMap from './multi-partition-map'
import range from './range'

function multiPartition (func, iter) {
  const groups = multiPartitionMap(func, iter)
  return map(index => groups.get(index), range())
}

export default function curriedMultiPartition (func, iter) {
  if (typeof iter === 'undefined') {
    return iter => multiPartition(func, iter)
  }
  return multiPartition(func, iter)
}
