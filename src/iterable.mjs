const emptyArray = []

export default function iterable (iterator) {
  if (iterator == null) {
    return emptyArray[Symbol.iterator]()
  } else if (iterator[Symbol.iterator]) {
    return iterator[Symbol.iterator]()
  } else if (typeof iterator !== 'object' || typeof iterator.next !== 'function') {
    throw new Error(`Expected to receive an iterator of the form {next()}, but instead received: ${iterator}`)
  }

  return {
    [Symbol.iterator] () {
      return iterator
    }
  }
}
