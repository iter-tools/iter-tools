import ensureIterable from './internal/ensure-iterable'
import range from './range'

function * merge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  let numberOfExhausted = 0
  const items = new Array(iterables.length)
  try {
    while (iters.length - 1 !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iters.length)) {
        if (typeof items[index] === 'undefined') {
          items[index] = iters[index].next()
        }
      }
      // pick and return the item
      const chosen = pickFunc(items)
      if (typeof items[chosen] === 'undefined') {
        throw new Error('iter-tools, merge: the sequence returned doesn\'t exist')
      }
      if (items[chosen] === null) {
        throw new Error('iter-tools, merge: the sequence returned is exhausted')
      }
      const { done, value } = items[chosen]
      if (done) {
        numberOfExhausted++
        items[chosen] = null
      } else {
        yield value
        items[chosen] = undefined
      }
    }
  } finally {
    for (const iter of iters) {
      if (typeof iter.return === 'function') iter.return()
    }
  }
}

export default function curriedMerge (pickFunc, iterables) {
  if (arguments.length === 1) {
    return iterables => merge(pickFunc, iterables)
  }

  return merge(pickFunc, iterables)
}
