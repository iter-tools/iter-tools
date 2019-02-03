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
    const lastArg = args[args.length - 1]
    if (isLastArgument(lastArg)) {
      const otherArgs = args.slice(0, -1)
      return fn(...appliedArgs, ...otherArgs, applyOnLastArg(lastArg))
    }
    return variadicCurry(fn, isLastArgument, applyOnLastArg, [...appliedArgs, ...args])
  }
}
