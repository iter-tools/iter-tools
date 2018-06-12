import iter from './iter'

export default function consume (func, iterable) {
  function curriedConsume (i) {
    for (const item of iter(i)) {
      func(item)
    }
  }
  if (iterable) {
    return curriedConsume(iterable)
  }
  return curriedConsume
}
