import iterable from './iterable'

function uncurried (func, iter) {
  const knownSatisfied = []
  const knownUnsatisfied = []
  let knownSatisfiedCursor = 0
  let knownUnsatisfiedCursor = 0
  let exhausted = false

  const iterator = iterable(iter)[Symbol.iterator]()
  function add () {
    const { value, done } = iterator.next()

    if (done) {
      exhausted = true
    } else {
      const chosen = func(value) ? knownSatisfied : knownUnsatisfied
      chosen.push(value)
    }
  }

  function satisfiedNext () {
    if (knownSatisfiedCursor < knownSatisfied.length) {
      const value = knownSatisfied[knownSatisfiedCursor]
      knownSatisfiedCursor += 1
      return { value, done: false }
    }

    if (exhausted) {
      return { value: undefined, done: true }
    }

    add()
    return satisfiedNext()
  }

  function unsatisfiedNext () {
    if (knownUnsatisfiedCursor < knownUnsatisfied.length) {
      const value = knownUnsatisfied[knownUnsatisfiedCursor]
      knownUnsatisfiedCursor += 1
      return { value, done: false }
    }

    if (exhausted) {
      return { value: undefined, done: true }
    }

    add()
    return unsatisfiedNext()
  }

  return [
    iterable({ next: satisfiedNext }),
    iterable({ next: unsatisfiedNext })
  ]
}

const curried = func => iter => uncurried(func, iter)

export default function partition (func, iter) {
  return iter === undefined ? curried(func) : uncurried(func, iter)
}
