export default function iter (iterable) {
  const args = Array.prototype.slice.call(arguments, 1)
  if (iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator](...args)
  } else if (typeof iterable === 'object' && 'next' in iterable) {
    return iterable
  } else if (typeof iterable === 'function') {
    return iter(iterable(...args))
  } else if (typeof iterable === 'object') {
    return (function * objectIter (obj) {
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        yield [keys[i], obj[keys[i]]]
      }
    }(iterable))
  }
  throw new Error('The argument is not a generator or iterator')
}
