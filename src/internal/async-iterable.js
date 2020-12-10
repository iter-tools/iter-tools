import { isAsyncIterable } from '../impls/is-async-iterable/is-async-iterable.js';
import { isAsyncLoopable } from '../impls/is-async-loopable/is-async-loopable.js';
import { isAsyncWrappable } from '../impls/is-async-wrappable/is-async-wrappable.js';
import { asyncNullableWrap as asyncWrap } from './async-wrap.js';
import { BaseIterableIterator, IterableIterator } from './iterable.js';
import { variadicCurryWithValidation } from './curry.js';
import { _, __iterate } from './symbols.js';

export {
  asyncWrap,
  isAsyncIterable as asyncIsIterable,
  isAsyncLoopable as asyncIsLoopable,
  isAsyncWrappable as asyncIsWrappable,
};

export async function asyncCallReturn(iterator) {
  if ('return' in iterator) await iterator.return();
}

export function asyncEnsureIterable(value) {
  if (!isAsyncWrappable(value)) {
    if (typeof value.next === 'function') {
      throw new TypeError(
        'iter-tools received a value that looked like an iterator but was not async iterable. Get help fixing this: https://github.com/iter-tools/iter-tools/wiki/Making-iterators-iterable#async-iterators',
      );
    } else throw new TypeError('Expected an async iterable, sync iterable, null or undefined');
  } else if (isAsyncIterable(value)) {
    return value;
  } else {
    return asyncWrap(value);
  }
}

export function AsyncIterableIterator(...args) {
  BaseIterableIterator.apply(this, args);
}

AsyncIterableIterator.prototype = Object.assign(Object.create(BaseIterableIterator.prototype), {
  constructor: AsyncIterableIterator,
  [Symbol.asyncIterator]() {
    return this[__iterate]();
  },
});

function AsyncSimpleIterableIterator(...args) {
  AsyncIterableIterator.apply(this, args);
}

AsyncSimpleIterableIterator.prototype = Object.assign(
  Object.create(AsyncIterableIterator.prototype),
  {
    [__iterate]() {
      return this[_].fn(...this[_].args);
    },
  },
);

function makeFunctionConfig(fn, fnConfig = {}) {
  const {
    validateArgs = (_) => {},
    variadic = false,
    reduces = false,
    growRight = false,
    minArgs = fn.length - 1,
    maxArgs = fn.length - 1,
    forceSync = false,
    applyOnIterableArgs = asyncEnsureIterable,
  } = fnConfig;

  return {
    fn,
    validateArgs,
    variadic,
    reduces,
    growRight,
    minArgs,
    maxArgs,
    isIterable: isAsyncWrappable,
    iterableType: 'asyncIterable',
    applyOnIterableArgs,
    IterableClass: forceSync ? IterableIterator : AsyncIterableIterator,
  };
}

export async function asyncCache(it) {
  const arr = [];
  for await (const value of it) arr.push(value);
  return asyncWrapWithIterableIterator(asyncWrap)(arr);
}

export function asyncWrapWithIterableIterator(fn, { validateArgs = (_) => _ } = {}) {
  return (...args) => {
    validateArgs(args);
    return new AsyncSimpleIterableIterator(fn, args);
  };
}

export const asyncIterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
