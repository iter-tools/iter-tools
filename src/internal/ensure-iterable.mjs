const emptyArr = []
export default function ensureIterable (i) {
  if (i == null) {
    return emptyArr[Symbol.iterator]()
  } else if (!i[Symbol.iterator]) {
    if (typeof i.next === 'function') {
      throw new Error('Iterators are not supported arguments to iter-tools. You must wrap them using the `iterable` method.')
    }
    throw new Error('The argument is not an iterable, or null')
  }
  return i
}
