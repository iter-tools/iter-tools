import { $iteratorSymbol, $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function reduce (initial, func, iterable) {
  let c = 0
  let acc = initial
  const iterator = iterable[$iteratorSymbol]()
  try {
    if (initial === undefined) {
      const firstResult = $await(iterator.next())
      if (firstResult.done) {
        throw new Error('Cannot reduce: no initial value specified and iterable was empty')
      }
      acc = firstResult.value
      c = 1
    }
    let result
    while (!(result = $await(iterator.next())).done) {
      acc = $await(func(acc, result.value, c++))
    }
    return acc
  } finally { // close the iterator in case of exceptions
    if (typeof iterator.return === 'function') $await(iterator.return())
  }
}

export default iterableCurry(reduce, { reduces: true, minArgs: 1, maxArgs: 2 })
