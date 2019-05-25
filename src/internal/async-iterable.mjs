import {
  BaseIterable,
  Iterable,
  ensureIterable as ensureSyncIterable,
  isValidIterableArgument
} from './iterable'
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
    return asyncify(ensureSyncIterable(i))
  }
}

export const ensureIterable = ensureAsyncIterable

export function isValidAsyncIterableArgument (i) {
  return isAsyncIterable(i) || isValidIterableArgument(i)
}

export function AsyncIterable () { BaseIterable.apply(this, arguments) }

AsyncIterable.prototype = Object.assign(Object.create(BaseIterable.prototype), {
  constructor: AsyncIterable,
  [Symbol.asyncIterator] () {
    return this.__iterate()
  }
})

function combineFunctionConfig (fn, fnConfig) {
  const { variadic, reduces, minArgs, maxArgs, forceSync } = fnConfig

  return {
    fn,
    variadic: !!variadic,
    reduces: !!reduces,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? variadic ? fn.length : fn.length - 1 : maxArgs,
    isIterable: isValidAsyncIterableArgument,
    iterableType: 'asyncIterable',
    applyOnIterableArgs: ensureAsyncIterable,
    IterableClass: forceSync ? Iterable : AsyncIterable
  }
}

export const asyncIterableCurry = (fn, config = {}) => {
  return variadicCurryWithValidation(combineFunctionConfig(fn, config))
}

export const iterableCurry = asyncIterableCurry
