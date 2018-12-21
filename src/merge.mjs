import ensureIterable from './internal/ensure-iterable'
import range from './range'

function * merge (pickFunc, iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  let numberOfExhausted = 0
  const items = new Array(iterables.length)
  try {
    while (iters.length !== numberOfExhausted) {
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

export function mergeByComparison (comparator) {
  return function _mergeByComparison (items) {
    if (items.length === 0) return

    return items
      .map((item, index) => ({ index, item }))
      .filter((decoratedItem) => !!decoratedItem.item)
      .sort((a, b) => comparator(a.item.value, b.item.value))[0].index
  }
}

const sum = (array) => array.reduce((out, current) => out + current, 0)

export function mergeByChance (weights) {
  return function _mergeByChance (items) {
    if (items.length === 0) return

    const validWeights = items
      .map((item, index) => weights[index] ? weights[index] : 1)
      .filter((weight, index) => items[index] !== null)

    const validItems = items
      .filter((item) => item !== null)

    const totalWeight = sum(validWeights)

    const draw = Math.random() * totalWeight

    let currentWeight = 0
    for (let i = 0; i < validItems.length; i++) {
      if (draw >= currentWeight && draw < currentWeight + validWeights[i]) {
        return i
      } else {
        currentWeight += validWeights[i]
      }
    }
  }
}

export function mergeByPosition (step) {
  let current = -step
  return function _mergeByPosition (items) {
    current = (current + step) % items.length
    while (items[current] === null) {
      current = (current + 1) % items.length
    }
    return current
  }
}
