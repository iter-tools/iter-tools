import {
  BaseResultIterable,
  ResultIterable,
  ensureIterable,
  isValidIterableArgument,
  isIterable,
} from './iterable';
import { variadicCurryWithValidation } from './curry';
import { _, __iterate } from './symbols';

export function isAsyncIterable(i) {
  return Boolean(i != null && i[Symbol.asyncIterator]);
}

export function asyncIsIterable(i) {
  return isAsyncIterable(i) || isIterable(i);
}

export async function asyncCallReturn(iterator) {
  if ('return' in iterator) await iterator.return();
}

export async function* asyncify(iterable) {
  if (isAsyncIterable(iterable)) {
    yield* iterable;
  } else {
    // it should be enough "yield* iterable", but it is broken with es5 version
    for (const item of iterable) {
      yield Promise.resolve(item);
    }
  }
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

AsyncResultIterable.prototype = Object.assign(Object.create(BaseResultIterable.prototype), {
  constructor: AsyncResultIterable,
  [Symbol.asyncIterator]() {
    return this[__iterate]();
  },
});

function AsyncSimpleResultIterable(...args) {
  AsyncResultIterable.apply(this, args);
}

AsyncSimpleResultIterable.prototype = Object.assign(Object.create(AsyncResultIterable.prototype), {
  [__iterate]() {
    return this[_].fn(...this[_].args);
  },
});

function makeFunctionConfig(fn, fnConfig = {}) {
  const {
    validateArgs,
    variadic,
    reduces,
    optionalArgsAtEnd,
    minArgs,
    maxArgs,
    forceSync,
  } = fnConfig;

  return {
    fn,
    validateArgs: validateArgs || ((_) => {}),
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? fn.length - 1 : maxArgs,
    isIterable: isValidAsyncIterableArgument,
    iterableType: 'asyncIterable',
    applyOnIterableArgs: asyncEnsureIterable,
    IterableClass: forceSync ? ResultIterable : AsyncResultIterable,
  };
}

export async function asyncCache(it) {
  const arr = [];
  for await (const value of it) arr.push(value);
  return asyncWrapWithResultIterable(asyncify)(arr);
}

export function asyncWrapWithResultIterable(fn, { validateArgs = (_) => _ } = {}) {
  return (...args) => {
    validateArgs(args);
    return new AsyncSimpleResultIterable(fn, args);
  };
}

export const asyncIterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
