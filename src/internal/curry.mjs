export function curry(fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args);
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args]);
  };
}

function insertUndefineds(args, at, count) {
  if (count > 0) {
    const argsLength = args.length;
    for (let i = argsLength - 1; i >= at; i--) {
      args[i + count] = args[i];
      args[i] = undefined;
    }
  }
}

function variadicCurryWithValidationInner(config, args) {
  const {
    fn,
    validateArgs,
    variadic,
    reduces,
    optionalArgsAtEnd,
    minArgs,
    maxArgs,
    isIterable,
    iterableType,
    applyOnIterableArgs,
    IterableClass,
  } = config;

  if (args.length > minArgs) {
    let argsIterable = true;

    const iterableArgsStart = variadic
      ? args.findIndex((arg, i) => isIterable(arg) && i >= minArgs)
      : Math.min(maxArgs, args.length - 1);
    const iterableArgsEnd = variadic ? args.length : iterableArgsStart + 1;

    if (variadic) {
      for (let i = iterableArgsStart; i < args.length; i++) {
        argsIterable = argsIterable && isIterable(args[i]);
      }
    } else {
      // Non-variadic functions are allowed to have more than one iterable-looking parameter
      argsIterable = isIterable(args[iterableArgsStart]);
    }

    if (args.length > maxArgs && (iterableArgsStart === -1 || !argsIterable)) {
      const iterableTypeOrNames = variadic ? `...${iterableType}s` : iterableType;
      const baseMessage =
        `${fn.name} takes up to ${maxArgs} arguments, followed by ${iterableTypeOrNames}. ` +
        `You already passed ${args.length} arguments`;
      if (variadic) {
        throw new Error(`${baseMessage} and the following arguments were not all ${iterableType}s`);
      } else {
        throw new Error(`${baseMessage} and the last argument was not ${iterableType}`);
      }
    }

    if (iterableArgsStart >= 0 && argsIterable) {
      // We have received all the config args we are going to get

      for (let i = iterableArgsStart; i < iterableArgsEnd; i++) {
        args[i] = applyOnIterableArgs(args[i]);
      }

      insertUndefineds(
        args,
        optionalArgsAtEnd ? iterableArgsStart : 0,
        maxArgs - iterableArgsStart,
      );

      validateArgs(args);

      const iterablesArg = variadic ? args.slice(maxArgs) : args[maxArgs];

      args.splice(maxArgs);

      return reduces ? fn(iterablesArg, ...args) : new IterableClass(fn, args, iterablesArg);
    } else {
      // We have not received any iterables, but we must be fully configured
    }
  }

  return variadicCurryWithValidation(config, args);
}

export function variadicCurryWithValidation(config, previousArgs = []) {
  return (...args) => {
    if (args.length === 0) {
      throw new Error('Cannot make a partial application with no arguments');
    }

    args.unshift(...previousArgs);

    return variadicCurryWithValidationInner(config, args);
  };
}
