import {
  BaseResultIterable,
  ResultIterable,
  ensureIterable,
  isValidIterableArgument,
} from './iterable';
import { variadicCurryWithValidation } from './curry';

export function isAsyncIterable(i) {
  return Boolean(i != null && i[Symbol.asyncIterator]);
}

export const asyncIsIterable = isAsyncIterable;

export async function* asyncify(iterable) {
  yield* iterable;
}

export function asyncEnsureIterable(i) {
  if (isAsyncIterable(i)) {
    return i;
  } else {
    return asyncify(ensureIterable(i));
  }
}

export function isValidAsyncIterableArgument(i) {
  return isAsyncIterable(i) || isValidIterableArgument(i);
}

export function AsyncResultIterable(...args) {
  BaseResultIterable.apply(this, args);
}

async function* keys(iterable) {
  let i = 0;
  for await (const _ of iterable) yield i++;
}

async function* entries(iterable) {
  let i = 0;
  for await (const value of iterable) yield [i++, value];
}

AsyncResultIterable.prototype = Object.assign(Object.create(BaseResultIterable.prototype), {
  constructor: AsyncResultIterable,
  [Symbol.asyncIterator]() {
    return this.__iterate();
  },
  keys() {
    return new AsyncResultIterable(keys, [this]);
  },
  values() {
    return this;
  },
  entries() {
    return new AsyncResultIterable(entries, [this]);
  },
});

function makeFunctionConfig(fn, fnConfig = {}) {
  const {
    validateArgs = _ => {},
    variadic,
    reduces,
    optionalArgsAtEnd,
    minArgs = fn.length - 1,
    maxArgs = fn.length - 1,
    forceSync,
    IterableClass = forceSync ? ResultIterable : AsyncResultIterable,
  } = fnConfig;

  return {
    fn,
    validateArgs,
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs,
    maxArgs,
    isIterable: isValidAsyncIterableArgument,
    iterableType: 'asyncIterable',
    applyOnIterableArgs: asyncEnsureIterable,
    IterableClass,
  };
}

export function asyncWrapWithResultIterable(
  fn,
  { validateArgs = _ => _, IterableClass = AsyncResultIterable } = {},
) {
  return (...args) => {
    validateArgs(args);
    return new IterableClass(fn, args);
  };
}

export const asyncIterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
