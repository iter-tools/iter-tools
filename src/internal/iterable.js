import { isIterable } from '../impls/is-iterable/is-iterable.js';
import { isLoopable } from '../impls/is-loopable/is-loopable.js';
import { isWrappable } from '../impls/is-wrappable/is-wrappable.js';
import { nullableWrap as wrap } from './wrap.js';
import { variadicCurryWithValidation } from './curry.js';
import { _, __iterate } from './symbols.js';

export { wrap, isIterable, isLoopable, isWrappable };

export function ensureIterable(value) {
  if (!isWrappable(value)) {
    if (typeof value.next === 'function') {
      throw new TypeError(
        'iter-tools received a value that looked like an iterator but was not iterable. Get help fixing this: https://github.com/iter-tools/iter-tools/wiki/Making-iterators-iterable',
      );
    } else throw new TypeError('Expected an iterable, null, or undefined');
  } else if (isIterable(value)) {
    return value;
  } else {
    return wrap(value);
  }
}

export function callReturn(iterator) {
  if ('return' in iterator) iterator.return();
}

export function BaseResultIterable(fn, args, iterablesArg) {
  this[_] = {
    fn,
    args,
    iterablesArg,
    staticIterator: null,
  };
}

Object.assign(BaseResultIterable.prototype, {
  constructor: BaseResultIterable,

  [__iterate]() {
    const { fn, args } = this[_];
    return fn(...args);
  },

  next() {
    const this_ = this[_];
    this_.staticIterator = this_.staticIterator || this[__iterate]();
    return this_.staticIterator.next();
  },

  return(value) {
    const this_ = this[_];
    this_.staticIterator = this_.staticIterator || this[__iterate]();
    return this_.staticIterator.return(value);
  },

  throw(error) {
    const this_ = this[_];
    this_.staticIterator = this_.staticIterator || this[__iterate]();
    return this_.staticIterator.throw(error);
  },
});

export function ResultIterable(...args) {
  BaseResultIterable.apply(this, args);
}

ResultIterable.prototype = Object.assign(Object.create(BaseResultIterable.prototype), {
  constructor: ResultIterable,
  [Symbol.iterator]() {
    return this[__iterate]();
  },
});

function makeFunctionConfig(fn, fnConfig = {}) {
  const {
    validateArgs = (_) => {},
    variadic = false,
    reduces = false,
    growRight = false,
    minArgs = fn.length - 1,
    maxArgs = fn.length - 1,
    applyOnIterableArgs = ensureIterable,
  } = fnConfig;

  return {
    fn,
    validateArgs,
    variadic,
    reduces,
    growRight,
    minArgs,
    maxArgs,
    isIterable: isWrappable,
    iterableType: 'iterable',
    applyOnIterableArgs,
    IterableClass: ResultIterable,
  };
}

export function cache(it) {
  return [...it];
}

export function wrapWithResultIterable(fn, { validateArgs = (_) => _ } = {}) {
  return (...args) => {
    validateArgs(args);
    return new ResultIterable(fn, args);
  };
}

export const iterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
