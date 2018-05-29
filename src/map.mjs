import iter from './iter'

export default function map (func, iterable) {
  function * curriedMap (i) {
    let c = 0
    for (const item of iter(i)) {
      yield func(item, c++)
    }
  }
  if (iterable) {
    return curriedMap(iterable)
  }
  return curriedMap
}
