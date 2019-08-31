import {
  BaseMethodIterable,
  MethodIterable,
  ensureIterable,
  isValidIterableArgument,
} from './iterable';
import { variadicCurryWithValidation } from './curry';

export function isAsyncIterable(i) {
  return Boolean(i != null && i[Symbol.asyncIterator]);
}

export const asyncIsIterable = isAsyncIterable;

export async function* asyncify(iterable) {
  if (isAsyncIterable(iterable)) {
    yield* iterable;
  } else {
    // it should be enough "yield * iterable", but it is broken with es5 version
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

export function AsyncMethodIterable(...args) {
  BaseMethodIterable.apply(this, args);
}

AsyncMethodIterable.prototype = Object.assign(Object.create(BaseMethodIterable.prototype), {
  constructor: AsyncMethodIterable,
  [Symbol.asyncIterator]() {
    return this.__iterate();
  },
});

function AsyncSimpleMethodIterable(...args) {
  AsyncMethodIterable.apply(this, args);
}

AsyncSimpleMethodIterable.prototype = Object.assign(Object.create(AsyncMethodIterable.prototype), {
  __iterate() {
    return this._fn(...this._args);
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
    validateArgs: validateArgs || (_ => {}),
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? fn.length - 1 : maxArgs,
    isIterable: isValidAsyncIterableArgument,
    iterableType: 'asyncIterable',
    applyOnIterableArgs: asyncEnsureIterable,
    IterableClass: forceSync ? MethodIterable : AsyncMethodIterable,
  };
}

export function asyncWrapWithMethodIterable(fn, { validateArgs = _ => _ } = {}) {
  return (...args) => {
    validateArgs(args);
    return new AsyncSimpleMethodIterable(fn, args);
  };
}

export const asyncIterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
