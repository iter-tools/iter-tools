export function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args])
  }
}

export function variadicCurryWithValidation (isLastArgument, lastArgumentName, applyOnLastArg, fn, minArgs = fn.length, maxArgs = fn.length, appliedArgs = []) {
  return (...args) => {
    const allArgs = [...appliedArgs, ...args]

    if (allArgs.length) {
      const lastArg = allArgs[allArgs.length - 1]
      if (isLastArgument(lastArg) && allArgs.length <= maxArgs && allArgs.length >= minArgs) {
        const otherArgs = allArgs.slice(0, -1)
        const optionalArgs = new Array(maxArgs - allArgs.length)
        return fn(...optionalArgs, ...otherArgs, applyOnLastArg(lastArg))
      }
    }

    if (allArgs.length >= maxArgs) {
      throw new Error(`${fn.name} takes up to ${maxArgs - 1} arguments, followed by ${lastArgumentName}. You already passed ${allArgs.length} arguments and the last argument was not ${lastArgumentName}`)
    }

    return variadicCurryWithValidation(isLastArgument, lastArgumentName, applyOnLastArg, fn, minArgs, maxArgs, allArgs)
  }
}
