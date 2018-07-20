const emptyArr = []
export default function iter (iterable, ...args) {
  if (iterable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (!iterable[Symbol.iterator]) {
    if (typeof iterable.next === 'function') {
      throw new Error('Iterators are not supported arguments to iter-tools. You must wrap them using the `iterable` method.')
    }
    throw new Error('The argument is not an iterable, or null')
  }
  return iterable
}
