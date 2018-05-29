import asyncIter from './async-iter'

export default function reduce (func, iterable) {
  async function curriedReduce (i) {
    let c = 0
    let acc
    for await (const item of asyncIter(i)) {
      acc = func(acc, item, c++)
    }
    return acc
  }

  if (iterable) {
    return curriedReduce(iterable)
  }
  return curriedReduce
}
