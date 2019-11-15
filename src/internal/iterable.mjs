import { variadicCurryWithValidation } from './curry';

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
    }
    throw new TypeError('The argument is not an iterable or null');
  }
  return i;
}

export function isValidIterableArgument(i) {
  return i == null || isIterable(i);
}

export function BaseResultIterable(fn, args) {
  this._fn = fn;
  this._args = args;
  this._staticIterator = null;
}

Object.assign(BaseResultIterable.prototype, {
  __iterate() {
    return this._fn(...this._args);
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

export function ResultIterable(...args) {
  BaseResultIterable.apply(this, args);
}

function* keys() {
  let i = 0;
  // eslint-disable-next-line no-unused-vars
  for (const _ of this) yield i++;
}

function* entries() {
  let i = 0;
  for (const value of this) yield [i++, value];
}

ResultIterable.prototype = Object.assign(Object.create(BaseResultIterable.prototype), {
  constructor: ResultIterable,
  [Symbol.iterator]() {
    return this.__iterate();
  },
  keys() {
    return new ResultIterable(keys, [this]);
  },
  values() {
    return this;
  },
  entries() {
    return new ResultIterable(entries, [this]);
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
    IterableClass = ResultIterable,
  } = fnConfig;

  return {
    fn,
    validateArgs,
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs,
    maxArgs,
    isIterable: isValidIterableArgument,
    iterableType: 'iterable',
    applyOnIterableArgs: ensureIterable,
    IterableClass,
  };
}

export function wrapWithResultIterable(
  fn,
  { validateArgs = _ => _, IterableClass = ResultIterable } = {},
) {
  return (...args) => {
    validateArgs(args);
    return new IterableClass(fn, args);
  };
}

export const iterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
