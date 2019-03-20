export function curry (fn, expectedArgsLength = fn.length, appliedArgs = []) {
  return (...args) => {
    if (expectedArgsLength <= args.length) {
      return fn(...appliedArgs, ...args)
    }
    return curry(fn, expectedArgsLength - args.length, [...appliedArgs, ...args])
  }
}

function unshiftUndefineds (args, by) {
  if (by) {
    const argsLength = args.length
    for (let i = argsLength - 1; i >= 0; i--) {
      args[i + by] = args[i]
      args[i] = undefined
    }
  }
}

class BaseIterable {
  constructor (fn, variadic, args, iterableArgs) {
    this._fn = fn
    this._args = args
    this._variadic = variadic
    this._iterableArgs = iterableArgs
    this._staticIterator = null
  }

  _iterate () {
    return this._variadic ? this._fn(...this._args, this._iterableArgs) : this._fn(...this._args)
  }

  next () {
    this._staticIterator = this._staticIterator || this._iterate()
    return this._staticIterator.next()
  }

  return (...args) {
    if (typeof this._staticIterator.return === 'function') this._staticIterator.return(...args)
  }
}

class Iterable extends BaseIterable {
  [Symbol.iterator] () {
    return this._iterate()
  }
}

class AsyncIterable extends BaseIterable {
  [Symbol.asyncIterator] () {
    return this._iterate()
  }
}

function variadicCurryWithValidationInner (
  isIterable,
  iterableType,
  applyOnIterableArgs,
  fn,
  variadic,
  reduces,
  forceSync,
  minConfigArgs,
  maxConfigArgs,
  args
) {
  if (args.length > minConfigArgs) {
    let iterableArgsStart = -1
    let allArgsIterable = true
    if (variadic) {
      iterableArgsStart = args.findIndex((arg, i) => isIterable(arg) && i >= minConfigArgs)

      for (let i = iterableArgsStart; i < args.length; i++) {
        allArgsIterable = allArgsIterable && isIterable(args[i])
      }
    } else if (isIterable(args[args.length - 1])) {
      // Non-variadic functions are allowed to have more than one iterable-looking parameter
      iterableArgsStart = args.length - 1
    }

    if (args.length > maxConfigArgs && (iterableArgsStart === -1 || !allArgsIterable)) {
      const iterableTypeOrNames = variadic ? `...${iterableType}s` : iterableType
      const baseMessage = `${fn.name} takes up to ${minConfigArgs} arguments, followed by ${iterableTypeOrNames}. You already passed ${args.length} arguments`
      if (variadic) {
        throw new Error(`${baseMessage} and the following arguments were not all ${iterableType}s`)
      } else {
        throw new Error(`${baseMessage} and the last argument was not ${iterableType}`)
      }
    }

    if (iterableArgsStart >= 0) {
      // We have received all the config args we are going to get

      for (let i = iterableArgsStart; i < args.length; i++) {
        args[i] = applyOnIterableArgs(args[i])
      }

      unshiftUndefineds(args, maxConfigArgs - iterableArgsStart)

      const IterableClass = iterableType === 'asyncIterable' && !forceSync ? AsyncIterable : Iterable

      if (variadic) {
        const iterableArgs = args.slice(iterableArgsStart)
        args.splice(iterableArgsStart)

        return reduces ? fn(...args, iterableArgs) : new IterableClass(fn, true, args, iterableArgs)
      } else {
        return reduces ? fn(...args) : new IterableClass(fn, false, args)
      }
    } else {
      // We have not received any iterables, but we must be fully configured
    }
  }

  return variadicCurryWithValidation(
    isIterable,
    iterableType,
    applyOnIterableArgs,
    fn,
    variadic,
    reduces,
    forceSync,
    minConfigArgs,
    maxConfigArgs,
    args
  )
}

export function variadicCurryWithValidation (
  isIterable,
  iterableType,
  applyOnIterableArgs,
  fn,
  variadic,
  reduces,
  forceSync,
  minConfigArgs = fn.length - 1,
  maxConfigArgs = fn.length - 1,
  previousArgs = []
) {
  return (...args) => {
    args.unshift(...previousArgs)

    return variadicCurryWithValidationInner(
      isIterable,
      iterableType,
      applyOnIterableArgs,
      fn,
      variadic,
      reduces,
      forceSync,
      minConfigArgs,
      maxConfigArgs,
      args
    )
  }
}
