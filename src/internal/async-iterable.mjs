import { ensureIterable, isValidIterableArgument } from './iterable'
import { variadicCurryWithValidation } from './curry'

export function isAsyncIterable (i) {
  return Boolean(i != null && i[Symbol.asyncIterator])
}

export async function * asyncify (iterable) {
  if (isAsyncIterable(iterable)) {
    yield * iterable
  } else {
    // it should be enough "yield * iterable", but it is broken with es5 version
    for (const item of iterable) {
      yield Promise.resolve(item)
    }
  }
}

export function ensureAsyncIterable (i) {
  if (isAsyncIterable(i)) {
    return i
  } else {
    return asyncify(ensureIterable(i))
  }
}

export function isValidAsyncIterableArgument (i) {
  return isAsyncIterable(i) || isValidIterableArgument(i)
}

export const asyncIterableCurry = (fn, { variadic = false, reduces = false, forceSync = false } = {}, minArgs, maxArgs) => {
  return variadicCurryWithValidation(
    isValidAsyncIterableArgument,
    'asyncIterable',
    ensureAsyncIterable,
    fn,
    variadic,
    reduces,
    forceSync,
    minArgs,
    maxArgs
  )
}
