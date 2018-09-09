const deprecationWarning = 'iter() is deprecated! It is probably safe to simply remove the call.'

let warnedDeprecation = false
export const silence = () => (warnedDeprecation = true)

const emptyArr = []
export default function iter (iterable, ...args) {
  !warnedDeprecation && console.warn(deprecationWarning)
  warnedDeprecation = true

  if (iterable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator]()
  } else if (typeof iterable === 'function') {
    return iter(iterable(...args))
  } else if (typeof iterable === 'object') {
    if (typeof iterable.next === 'function') {
      throw new Error('Iterators are not supported arguments to iter.')
    } else {
      throw new Error('Objects are no longer supported arguments to iter. Please use the entries function.')
    }
  }
  throw new Error('The argument is not a generator function or an iterable')
}
