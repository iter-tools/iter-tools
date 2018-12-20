import ensureAsyncIterable from './internal/ensure-async-iterable'
import querablePromise from './internal/querable-promise'
import range from './range'

async function * asyncMerge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureAsyncIterable(i)[Symbol.asyncIterator]())
  let numberOfExhausted = 0
  const items = new Array(iters.length)
  try {
    while (iters.length - 1 !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iters.length)) {
        if (typeof items[index] === 'undefined') {
          items[index] = querablePromise(iters[index].next()) // promises should be quer-able
        }
      }
      // pick and return the item
      const chosen = await pickFunc(items)
      if (typeof items[chosen] === 'undefined') {
        throw new Error('iter-tools, merge: the sequence returned doesn\'t exist')
      }
      if (items[chosen] === null) {
        throw new Error('iter-tools, async-merge: the sequence returned is exhausted')
      }
      const { done, value } = await items[chosen]
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

export default function curriedAsyncMerge (pickFunc, iterables) {
  if (arguments.length === 1) {
    return iterables => asyncMerge(pickFunc, iterables)
  }

  return asyncMerge(pickFunc, iterables)
}
