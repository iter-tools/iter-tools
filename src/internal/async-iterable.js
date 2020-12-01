import { isAsyncIterable } from '../impls/is-async-iterable/is-async-iterable.js';
import { isAsyncLoopable } from '../impls/is-async-loopable/is-async-loopable.js';
import { isAsyncWrappable } from '../impls/is-async-wrappable/is-async-wrappable.js';
import { asyncNullableWrap as asyncWrap } from './async-wrap.js';
import { BaseResultIterable, ResultIterable } from './iterable.js';
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
    isIterable: isAsyncWrappable,
    iterableType: 'asyncIterable',
    applyOnIterableArgs: asyncEnsureIterable,
    IterableClass: forceSync ? ResultIterable : AsyncResultIterable,
  };
}

export async function asyncCache(it) {
  const arr = [];
  for await (const value of it) arr.push(value);
  return asyncWrapWithResultIterable(asyncWrap)(arr);
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
