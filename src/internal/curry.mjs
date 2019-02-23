export function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  function curryInternal (...args) {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    const argsLength = args.length
    args.unshift(...appliedArgs)
    return curry(fn, expectedArgsLength - argsLength, args)
  }

  curryInternal.partial = function (...args) {
    const argsLength = args.length
    args.unshift(...appliedArgs)
    return curryInternal(fn, expectedArgsLength - argsLength, args)
  }

  return curryInternal
}

export function variadicCurryWithValidation (
  isIterable,
  lastArgumentName,
  applyOnIterableArgs,
  fn,
  variadic,
  minConfigArgs = fn.length - 1,
  maxConfigArgs = fn.length - 1,
  appliedArgs = []
) {
  function curried (...args) {
    args.unshift(...appliedArgs)

    if (args.length > minConfigArgs) {
      let iterableArgsStart = -1
      if (variadic) {
        iterableArgsStart = args.findIndex((arg, i) => isIterable(arg) && i >= minConfigArgs)
      } else if (isIterable(args[args.length - 1])) {
        // Non-variadic functions are allowed to have more than one iterable-looking parameter
        iterableArgsStart = args.length - 1
      }

      if (args.length > maxConfigArgs && iterableArgsStart === -1) {
        throw new Error(`${fn.name} takes up to ${maxConfigArgs} arguments, followed by ${lastArgumentName}. You already passed ${args.length} arguments and the last argument was not ${lastArgumentName}`)
      }

      if (iterableArgsStart >= 0) {
        // We have received all the config args we are going to get

        for (let i = iterableArgsStart; i < args.length; i++) {
          if (!isIterable(args[i])) {
            throw new Error(
              `${fn.name} expects its arguments to end with ${variadic ? '' : 'an'} ${lastArgumentName}. ${variadic ? 'Some passed arguments were not iterable.' : ''}`
            )
          }
          args[i] = applyOnIterableArgs(args[i])
        }

        const argsLength = args.length
        const configArgsMissing = maxConfigArgs - iterableArgsStart

        if (configArgsMissing) {
          for (let i = argsLength - 1; i >= 0; i--) {
            args[i + configArgsMissing] = args[i]
            args[i] = undefined
          }
        }

        if (variadic) {
          const iterableArgs = args.slice(iterableArgsStart)
          args.splice(iterableArgsStart)

          return fn(...args, iterableArgs)
        } else {
          return fn(...args)
        }
      } else {
        // We have not received any iterables, but we must be fully configured
      }
    }

    return variadicCurryWithValidation(
      isIterable,
      lastArgumentName,
      applyOnIterableArgs,
      fn,
      variadic,
      minConfigArgs,
      maxConfigArgs,
      args
    )
  }

  curried.partial = function (...args) {
    args.unshift(...appliedArgs)

    return variadicCurryWithValidation(
      isIterable,
      lastArgumentName,
      applyOnIterableArgs,
      fn,
      variadic,
      minConfigArgs,
      maxConfigArgs,
      args
    )
  }

  return curried
}
