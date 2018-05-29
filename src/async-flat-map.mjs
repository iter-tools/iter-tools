import map from './async-map'

export default function flatMap (func, iterable) {
  const mapIter = map(func)
  async function * curriedFlatMap (i) {
    for await (const item of mapIter(i)) {
      yield * item
    }
  }
  if (iterable) {
    return curriedFlatMap(iterable)
  }
  return curriedFlatMap
}
