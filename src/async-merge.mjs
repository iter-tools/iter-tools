import ensureAsyncIterable from './internal/ensure-async-iterable'
import querablePromise from './internal/querable-promise'
import range from './range'

async function * asyncMerge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureAsyncIterable(i)[Symbol.iterator]())
  let numberOfExhausted = 0
  const items = new Array(iterables.length)
  try {
    while (iters.length !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iterables.length)) {
        if (typeof items[index] === 'undefined') {
          items[index] = querablePromise(iterables[index].next()) // promises should be quer-able
        }
      }
      // pick and return the item
      const chosen = await pickFunc(items)
      const { done, value } = await items[chosen]
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

export default function curriedAsyncMerge (pickFunc, iterables) {
  if (arguments.length === 1) {
    return iterable => asyncMerge(pickFunc, iterable)
  }

  return asyncMerge(pickFunc, iterables)
}
