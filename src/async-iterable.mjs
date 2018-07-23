async function * asyncify (iterable) {
  yield * iterable
}

const emptyArray = []

export default function asyncIterable (asyncIterator) {
  if (asyncIterator == null) {
    return asyncify(emptyArray)
  } else if (asyncIterator[Symbol.asyncIterator]) {
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
