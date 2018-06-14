import entries from './entries'

const emptyArr = []
export default function iter (iterable, ...args) {
  if (iterable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator](...args)
  } else if (typeof iterable === 'object') {
    return entries(iterable)
  } else if (typeof iterable === 'function') {
    return iter(iterable(...args))
  }
  throw new Error('The argument is not a generator, iterable, or object')
}
