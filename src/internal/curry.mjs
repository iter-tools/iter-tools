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
    let iterableArgsStart = -1;
    let allArgsIterable = true;
    if (variadic) {
      iterableArgsStart = args.findIndex((arg, i) => isIterable(arg) && i >= minArgs);

      for (let i = iterableArgsStart; i < args.length; i++) {
        allArgsIterable = allArgsIterable && isIterable(args[i]);
      }
    } else if (isIterable(args[args.length - 1])) {
      // Non-variadic functions are allowed to have more than one iterable-looking parameter
      iterableArgsStart = args.length - 1;
    }

    if (args.length > maxArgs && (iterableArgsStart === -1 || !allArgsIterable)) {
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

    if (iterableArgsStart >= 0) {
      // We have received all the config args we are going to get

      for (let i = iterableArgsStart; i < args.length; i++) {
        args[i] = applyOnIterableArgs(args[i]);
      }

      insertUndefineds(
        args,
        optionalArgsAtEnd ? iterableArgsStart : 0,
        maxArgs - iterableArgsStart,
      );

      validateArgs(...args);

      if (variadic) {
        const iterableArgs = args.slice(maxArgs);

        args.splice(maxArgs);

        return reduces ? fn(...args, iterableArgs) : new IterableClass(config, args, iterableArgs);
      } else {
        return reduces ? fn(...args) : new IterableClass(config, args);
      }
    } else {
      // We have not received any iterables, but we must be fully configured
    }
  }

  return variadicCurryWithValidation(config, args);
}

export function variadicCurryWithValidation(config, previousArgs = []) {
  return (...args) => {
    args.unshift(...previousArgs);

    return variadicCurryWithValidationInner(config, args);
  };
}
