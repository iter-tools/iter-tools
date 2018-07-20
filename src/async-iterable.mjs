async function * asyncify (iterable) {
  yield * iterable
}

export default function asyncIterable (asyncIterator) {
  if (asyncIterator[Symbol.asyncIterator]) {
    return asyncIterator
  } else if (asyncIterator[Symbol.iterator]) {
    asyncIterator = asyncify(asyncIterator)[Symbol.asyncIterator]()
  } else if (typeof asyncIterator !== 'object' || typeof asyncIterator.next !== 'function') {
    throw new Error(`Expected to receive an async iterator of the form {next()}, but instead received: ${asyncIterator}`)
  }

  return {
    [Symbol.asyncIterator] () {
      return asyncIterator
    }
  }
}
