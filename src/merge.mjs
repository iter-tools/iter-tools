import { ensureIterable } from './internal/iterable'
import range from './range'

function * merge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  let numberOfExhausted = 0
  const items = new Array(iterables.length)
  try {
    while (iters.length !== numberOfExhausted) {
      // tries to add items to zipped wherever the index is not exhausted
      for (const index of range(iters.length)) {
        if (items[index] === undefined) {
          items[index] = iters[index].next()
        }
      }
      // pick and return the item
      const chosen = pickFunc(items)
      if (items[chosen] === undefined) {
        throw new Error('the sequence returned doesn\'t exist')
      }
      if (items[chosen] === null) {
        throw new Error('the sequence returned is exhausted')
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

/* default compare */
const toString = (obj) => {
  if (obj === null) return 'null'
  if (typeof obj === 'boolean' || typeof obj === 'number') return (obj).toString()
  if (typeof obj === 'string') return obj
  if (typeof obj === 'symbol') throw new TypeError()
  return (obj).toString()
}

const defaultCompare = (x, y) => {
  if (x === undefined && y === undefined) return 0
  if (x === undefined) return 1
  if (y === undefined) return -1

  const xString = toString(x)
  const yString = toString(y)

  if (xString < yString) return -1
  if (xString > yString) return 1
  return 0
}

/*
 helpers
*/
export function mergeByComparison (comparator = defaultCompare) {
  return function _mergeByComparison (items) {
    if (items.length === 0) return

    return items
      .map((item, index) => ({ index, item }))
      .filter((decoratedItem) => !!decoratedItem.item)
      .sort((a, b) => comparator(a.item.value, b.item.value))[0].index
  }
}

export function mergeByChance (weights = []) {
  return function _mergeByChance (items) {
    if (items.length === 0) return

    const validItems = items
      .map((item, index) => ({
        index,
        item,
        weight: weights[index] ? weights[index] : 1
      }))
      .filter((decoratedItem) => !!decoratedItem.item)

    const totalWeight = validItems.reduce((out, current) =>
      out + current.weight, 0)

    const draw = Math.random() * totalWeight

    let currentWeight = 0
    for (let i = 0; i < validItems.length; i++) {
      if (draw >= currentWeight && draw < currentWeight + validItems[i].weight) {
        return validItems[i].index
      } else {
        currentWeight += validItems[i].weight
      }
    }
  }
}

export function mergeByPosition (step = 1) {
  let current = -step
  return function _mergeByPosition (items) {
    current = (current + step) % items.length
    while (items[current] === null) {
      current = (current + 1) % items.length
    }
    return current
  }
}
