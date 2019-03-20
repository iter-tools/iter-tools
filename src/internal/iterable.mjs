import { variadicCurryWithValidation } from './curry'
const emptyArr = []

export function isIterable (i) {
  return Boolean(i != null && i[Symbol.iterator])
}

export function ensureIterable (i) {
  if (i == null) {
    return emptyArr[Symbol.iterator]()
  } else if (!isIterable(i)) {
    if (typeof i.next === 'function') {
      throw new TypeError('Iterators are not supported arguments to iter-tools. It must be an iterable. For example: { [Symbol.iterator] : () => currentArgument }')
    }
    throw new TypeError('The argument is not an iterable or null')
  }
  return i
}

export function isValidIterableArgument (i) {
  return i == null || isIterable(i)
}

export const iterableCurry = (fn, { variadic = false, reduces = false } = {}, minArgs, maxArgs) => {
  return variadicCurryWithValidation(
    isValidIterableArgument,
    'iterable',
    ensureIterable,
    fn,
    variadic,
    reduces,
    false,
    minArgs,
    maxArgs
  )
}
