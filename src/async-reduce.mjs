import { asyncIterableCurry } from './internal/async-iterable'

async function asyncReduce (initial, func, iterable) {
  let c = 0
  let acc = initial
  const iterator = iterable[Symbol.asyncIterator]()
  try {
    if (initial === undefined) {
      const firstResult = await iterator.next()
      if (firstResult.done) {
        throw new TypeError('Reduce of empty iterable with no initial value')
      }
      acc = firstResult.value
      c = 1
    }
    let result
    while (!(result = await iterator.next()).done) {
      acc = await func(acc, result.value, c++)
    }
    return acc
  } finally { // close the iterable in case of exceptions
    if (typeof iterable.return === 'function') await iterable.return()
  }
}

export default asyncIterableCurry(asyncReduce, 2, 3)
