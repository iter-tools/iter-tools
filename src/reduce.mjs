import { iterableCurry } from './internal/iterable'

function reduce (initial, func, iterable) {
  let c = 0
  let acc = initial
  const iterator = iterable[Symbol.iterator]()
  try {
    if (initial === undefined) {
      const firstResult = iterator.next()
      if (firstResult.done) {
        throw new Error('Cannot reduce: no initial value specified and iterable was empty')
      }
      acc = firstResult.value
      c = 1
    }
    let result
    while (!(result = iterator.next()).done) {
      acc = func(acc, result.value, c++)
    }
    return acc
  } finally { // close the iterable in case of exceptions
    if (typeof iterable.return === 'function') iterable.return()
  }
}

export default iterableCurry(reduce, { variadic: false, reduces: true }, 1, 2)
