import iter from './iter'

export default function reduce (func, iterable) {
  function curriedReduce (i) {
    let c = 0
    let acc
    for (const item of iter(i)) {
      acc = func(acc, item, c++)
    }
    return acc
  }

  if (iterable) {
    return curriedReduce(iterable)
  }
  return curriedReduce
}
