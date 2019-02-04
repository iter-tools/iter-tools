export function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args])
  }
}

export function variadicCurry (isLastArgument, applyOnLastArg, fn, appliedArgs = []) {
  return (...args) => {
    const allArgs = [...appliedArgs, ...args]
    const lastArg = args[allArgs.length - 1]

    if (isLastArgument(lastArg) && allArgs.length <= fn.length) {
      const otherArgs = allArgs.slice(0, -1)
      otherArgs.length = fn.length - 1 // add padding
      return fn(...otherArgs, applyOnLastArg(lastArg))
    }

    if (allArgs.length >= fn.length) {
      throw new Error(`${fn.name} takes ${fn.length} arguments. You passed ${allArgs.length}`)
    }

    return variadicCurry(isLastArgument, applyOnLastArg, fn, allArgs)
  }
}
