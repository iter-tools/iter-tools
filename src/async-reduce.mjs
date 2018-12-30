import ensureAsyncIterable from './internal/ensure-async-iterable'

async function reduce (initial, func, iterable) {
  let c = 0
  let acc = initial
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
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
    if (typeof iterable.return === 'function') iterable.return()
  }
}

export default function curriedReduce (initial, func, iterable) {
  // is this complete? has an iterable been specified? (func can never be iterable)
  //    is there an iterable that comes after func
  //    work backwards from there
  let hasIterable = false

  if (arguments.length === 1) {
    func = initial
    initial = undefined
  } else if (
    arguments.length === 2 &&
      (
        func == null || func[Symbol.iterator] || func[Symbol.asyncIterator]
      )
  ) {
    iterable = func
    func = initial
    initial = undefined

    hasIterable = true
  } else if (arguments.length === 3) {
    hasIterable = true
  }

  if (!hasIterable) {
    return iterable => reduce(initial, func, iterable)
  }
  return reduce(initial, func, iterable)
}
