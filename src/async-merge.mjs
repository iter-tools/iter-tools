import { ensureAsyncIterable } from './internal/async-iterable'
import { iterableCurry } from './internal/iterable'
import querablePromise from './internal/querable-promise'
import range from './range'
import { mergeByComparison, mergeByChance, mergeByPosition } from './merge'

async function * asyncMerge (pickFunc, iterables) {
  const iters = Array.from(iterables).map(i => ensureAsyncIterable(i)[Symbol.asyncIterator]())
  let numberOfExhausted = 0
  const items = new Array(iters.length)
  try {
    while (iters.length !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iters.length)) {
        if (items[index] === undefined) {
          items[index] = querablePromise(iters[index].next()) // promises should be quer-able
        }
      }
      // pick and return the item
      const chosen = await pickFunc(items)
      if (items[chosen] === undefined) {
        throw new Error('async-merge: the sequence returned doesn\'t exist')
      }
      if (items[chosen] === null) {
        throw new Error('async-merge: the sequence returned is exhausted')
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
      if (typeof iter.return === 'function') await iter.return()
    }
  }
}

export default iterableCurry(asyncMerge)

const makeAsync = (func) => {
  return function (args) {
    const _func = func(args)
    return async function (promises) {
      const items = await Promise.all(promises)
      return _func(items)
    }
  }
}

export const asyncMergeByComparison = makeAsync(mergeByComparison)
export const asyncMergeByChance = makeAsync(mergeByChance)
export const asyncMergeByPosition = makeAsync(mergeByPosition)

const expire = (ms) =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('async-merge: no sequence is ready after the configured interval')), ms))

export function asyncMergeByReadiness (ms) {
  return async function _asyncMergeByReadiness (promises) {
    const validPromises = promises
      .filter((promise) => promise) // filter out exhausted iterables

    if (ms) {
      validPromises.push(expire(ms))
    }

    await Promise.race(validPromises) // as least 1 promise should be resolved or there is no point in returning anything

    for (let index = 0; index < promises.length; index++) {
      if (promises[index] === null) continue
      if (!promises[index].isPending()) {
        return index
      }
    }
  }
}
