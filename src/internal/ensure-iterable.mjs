import isIterable from './is-iterable'

const emptyArr = []

export default function ensureIterable (i) {
  if (i == null) {
    return emptyArr[Symbol.iterator]()
  } else if (!isIterable(i)) {
    if (typeof i.next === 'function') {
      throw new TypeError('Iterators are not supported arguments to iter-tools. You must wrap them using the `iterable` method.')
    }
    throw new TypeError('The argument is not an iterable or null')
  }
  return i
}
