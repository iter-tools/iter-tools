import chain from './chain'
import partition from './partition'
import ensureIterable from './internal/ensure-iterable'

const result = (satisfied, unsatisfied) => ({ satisfied, unsatisfied })

function getFn (fns) {
  const iterator = ensureIterable(fns)[Symbol.iterator]()
  const { done, value } = iterator.next()
  return done ? { empty: true } : { fn: value, nextFns: iterator }
}

function multiFilter (fns, iter) {
  const { empty, fn, nextFns } = getFn(fns)
  if (empty) return result([], iter)
  const [value, nextIter] = partition(fn, iter)
  const { satisfied, unsatisfied } = multiFilter(nextFns, nextIter)
  return result(chain([value], satisfied), unsatisfied)
}

export default function multiFilterCurried (fns, iter) {
  if (iter === undefined) {
    return iter => multiFilter(fns, iter)
  }

  return multiFilter(fns, iter)
}
