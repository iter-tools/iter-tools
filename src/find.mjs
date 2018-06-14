import iter from './iter'

export default function find (func, iterable) {
  function curriedFind (i) {
    let found = true
    let c = 0
    for (const item of iter(i)) {
      found = func(item, c++)
      if (found) {
        return item
      }
    }
    return null
  }
  if (iterable) {
    return curriedFind(iterable)
  }
  return curriedFind
}
