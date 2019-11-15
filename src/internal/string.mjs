import { variadicCurryWithValidation } from './curry';
import { ResultIterable } from './iterable';

export function isString(s) {
  return typeof s === 'string';
}

export function ensureString(i) {
  if (i == null) {
    return '';
  } else if (!isString(i)) {
    throw new TypeError('The argument is not a string or null');
  }
  return i;
}

export function isValidStringArgument(i) {
  return i == null || isString(i);
}

function makeFunctionConfig(fn, fnConfig = {}) {
  const {
    validateArgs,
    variadic,
    reduces,
    optionalArgsAtEnd,
    minArgs,
    maxArgs,
    IterableClass = ResultIterable,
  } = fnConfig;

  return {
    fn,
    validateArgs: validateArgs || (() => {}),
    variadic: !!variadic,
    reduces: !!reduces,
    optionalArgsAtEnd: !!optionalArgsAtEnd,
    minArgs: minArgs === undefined ? fn.length - 1 : minArgs,
    maxArgs: maxArgs === undefined ? fn.length - 1 : maxArgs,
    isIterable: isValidStringArgument,
    iterableType: 'string',
    applyOnIterableArgs: ensureString,
    IterableClass,
  };
}

export const stringCurry = (fn, config) => {
  return variadicCurryWithValidation(makeFunctionConfig(fn, config));
};
