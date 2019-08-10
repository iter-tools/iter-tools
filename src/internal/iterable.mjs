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

export function BaseMethodIterable(config, args, iterableArgs) {
  this._config = config;
  this._args = args;
  this._iterableArgs = iterableArgs;
  this._staticIterator = null;
}

Object.assign(BaseMethodIterable.prototype, {
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

export function MethodIterable(...args) {
  BaseMethodIterable.apply(this, args);
}

MethodIterable.prototype = Object.assign(Object.create(BaseMethodIterable.prototype), {
  constructor: MethodIterable,
  [Symbol.iterator]() {
    return this.__iterate();
  },
});

function makeFunctionConfig(fn, fnConfig = {}) {
  const { validateArgs, variadic, reduces, optionalArgsAtEnd, minArgs, maxArgs } = fnConfig;

  return {
    fn,
    validateArgs: validateArgs || (_ => {}),
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? fn.length - 1 : maxArgs,
    isIterable: isValidIterableArgument,
    iterableType: 'iterable',
    applyOnIterableArgs: ensureIterable,
    IterableClass: MethodIterable,
  };
}

export function wrapWithMethodIterable(fn, config) {
  const fnConfig = makeFunctionConfig(fn, config);
  return (...args) => {
    fnConfig.validateArgs(args);
    return new MethodIterable(fnConfig, args);
  };
}

export const iterableCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
