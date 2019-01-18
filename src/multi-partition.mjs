import map from './map'
import multiPartitionMap from './multi-partition-map'
import range from './range'

function uncurried (func, iter) {
  const groups = multiPartitionMap(func, iter)
  return map(index => groups.get(index), range())
}

const curried = func => iter => uncurried(func, iter)

export default function multiPartition (func, iter) {
  return iter === undefined ? curried(func) : uncurried(func, iter)
}
