export default function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args])
  }
}
