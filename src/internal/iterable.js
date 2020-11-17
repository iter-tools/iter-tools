import { variadicCurryWithValidation } from './curry.js';
import { _, __iterate } from './symbols.js';

export function* empty() {}

export function isIterable(i) {
  return Boolean(i != null && i[Symbol.iterator]);
}

export function ensureIterable(i) {
  if (i == null) {
    return empty();
  } else if (!isIterable(i)) {
    if (typeof i.next === 'function') {
      throw new TypeError(
        'Iterators are not supported arguments to iter-tools. It must be an iterable. For example: { [Symbol.iterator] : () => currentArgument }',
      );
    } else throw new TypeError('The argument is not an iterable or null');
  }
  return i;
}

export function callReturn(iterator) {
  if ('return' in iterator) iterator.return();
}

export function isValidIterableArgument(i) {
  return i == null || isIterable(i);
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
    const { fn, iterablesArg, args } = this[_];
    return fn(iterablesArg, ...args);
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

function SimpleResultIterable(...args) {
  ResultIterable.apply(this, args);
}

SimpleResultIterable.prototype = Object.assign(Object.create(ResultIterable.prototype), {
  constructor: SimpleResultIterable,
  [__iterate]() {
    return this[_].fn(...this[_].args);
  },
});

function makeFunctionConfig(fn, fnConfig = {}) {
  const { validateArgs, variadic, reduces, optionalArgsAtEnd, minArgs, maxArgs } = fnConfig;

  return {
    fn,
    validateArgs: validateArgs || ((_) => {}),
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? fn.length - 1 : maxArgs,
    isIterable: isValidIterableArgument,
    iterableType: 'iterable',
    applyOnIterableArgs: ensureIterable,
    IterableClass: ResultIterable,
  };
}

export function cache(it) {
  return [...it];
}

export function wrapWithResultIterable(fn, { validateArgs = (_) => _ } = {}) {
  return (...args) => {
    validateArgs(args);
    return new SimpleResultIterable(fn, args);
  };
}

export const iterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
