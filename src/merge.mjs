import ensureIterable from './internal/ensure-iterable'
import range from './range'

function * merge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  let numberOfExhausted = 0
  const items = new Array(iterables.length)
  try {
    while (iters.length !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iterables.length)) {
        if (typeof items[index] === 'undefined') {
          items[index] = iterables[index].next()
        }
      }
      // pick and return the item
      const chosen = pickFunc(items)
      const { done, value } = items[chosen]
      if (done) {
        numberOfExhausted++
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
    return iterable => merge(pickFunc, iterable)
  }

  return merge(pickFunc, iterables)
}
