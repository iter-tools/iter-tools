export function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args])
  }
}

export function variadicCurryWithValidation (isLastArgument, lastArgumentName, applyOnLastArg, fn, maxArgs = fn.length, appliedArgs = []) {
  return (...args) => {
    const allArgs = [...appliedArgs, ...args]
    const lastArg = allArgs[allArgs.length - 1]

    if (isLastArgument(lastArg) && allArgs.length <= maxArgs) {
      const otherArgs = allArgs.slice(0, -1)
      otherArgs.length = maxArgs - 1 // add padding
      return fn(...otherArgs, applyOnLastArg(lastArg))
    }

    if (allArgs.length >= maxArgs) {
      throw new Error(`${fn.name} takes up to ${maxArgs - 1} arguments, followed by ${lastArgumentName}. You already passed ${allArgs.length} arguments and the last argument was not ${lastArgumentName}`)
    }

    return variadicCurryWithValidation(isLastArgument, lastArgumentName, applyOnLastArg, fn, maxArgs, allArgs)
  }
}
