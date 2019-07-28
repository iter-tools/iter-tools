import { variadicCurryWithValidation } from './curry';

function* empty() {}

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
    }
    throw new TypeError('The argument is not an iterable or null');
  }
  return i;
}

export function isValidIterableArgument(i) {
  return i == null || isIterable(i);
}

export function BaseIterable(config, args, iterableArgs) {
  this._config = config;
  this._args = args;
  this._iterableArgs = iterableArgs;
  this._staticIterator = null;
}

Object.assign(BaseIterable.prototype, {
  __iterate() {
    const { variadic, fn } = this._config;
    return variadic ? fn(...this._args, this._iterableArgs) : fn(...this._args);
  },

  throw() {
    this._staticIterator = this._staticIterator || this.__iterate();
    return this._staticIterator.throw();
  },

  next() {
    this._staticIterator = this._staticIterator || this.__iterate();
    return this._staticIterator.next();
  },

  return(...args) {
    if (typeof this._staticIterator.return === 'function') {
      this._staticIterator.return(...args);
    }
  },
});

export function Iterable() {
  BaseIterable.apply(this, arguments);
}

Iterable.prototype = Object.assign(Object.create(BaseIterable.prototype), {
  constructor: Iterable,
  [Symbol.iterator]() {
    return this.__iterate();
  },
});

function combineFunctionConfig(fn, fnConfig) {
  const { variadic, reduces, minArgs, maxArgs } = fnConfig;

  return {
    fn,
    variadic: !!variadic,
    reduces: !!reduces,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? (variadic ? fn.length : fn.length - 1) : maxArgs,
    isIterable: isValidIterableArgument,
    iterableType: 'iterable',
    applyOnIterableArgs: ensureIterable,
    IterableClass: Iterable,
  };
}

export const iterableCurry = (fn, config = {}) => {
  return variadicCurryWithValidation(combineFunctionConfig(fn, config));
};
