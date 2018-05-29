import map from './map'

export default function flatMap (func, iterable) {
  const mapIter = map(func)
  function * curriedFlatMap (i) {
    for (const item of mapIter(i)) {
      yield * item
    }
  }
  if (iterable) {
    return curriedFlatMap(iterable)
  }
  return curriedFlatMap
}
