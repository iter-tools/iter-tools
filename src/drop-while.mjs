import iter from './iter'

export default function dropWhile (func, iterable) {
  function * curriedDropWhile (i) {
    let drop = true
    let c = 0
    for (const item of iter(i)) {
      if (!drop) {
        yield item
      } else {
        drop = func(item, c++)
        if (!drop) {
          yield item
        }
      }
    }
  }
  if (iterable) {
    return curriedDropWhile(iterable)
  }
  return curriedDropWhile
}
