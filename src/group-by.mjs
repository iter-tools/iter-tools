import { iterableCurry } from './internal/iterable'
import { Exchange } from './internal/queues'

const UNIQUE_INITIAL_KEY = {}

function groupBy (getKey = (k) => k, iterable) {
  const iterator = iterable[Symbol.iterator]()

  let itemIndex = 0
  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false
  let currentItem

  // fetch new item from Iterator
  // return the item and advance the
  // main queue consumer
  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
      return
    }
    currentItem = { value: newItem.value, key: getKey(newItem.value, itemIndex++) }
    exchange.push(currentItem)
  }

  // close the original iterator if possible
  function returnIterator () {
    if (noNewIterables && iterableCounter === 0) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  // generate subgroup where adjacent items have the same key
  // it picks up new item from the buffer. Every instance has
  // its own independent consumer
  function * generateGroup (firstItem, cons) {
    try {
      iterableCounter++
      yield 'ensure finally'

      yield firstItem.value

      while (true) {
        if (cons.isEmpty()) {
          fetch()
          if (done) return
          continue
        }
        const nextItem = cons.shift()
        if (nextItem.key !== firstItem.key) {
          return
        }
        yield nextItem.value
      }
    } finally {
      iterableCounter--
      returnIterator()
    }
  }

  // generate group returning [key, subgroup]
  // it always picks up new items from the Iterator (fetch)
  function * generateGroups () {
    let currentKey = UNIQUE_INITIAL_KEY
    try {
      while (true) {
        // I need to fetch a new item if currentItem is undefined (first time)
        // or
        // currentItem.key === currentKey that means that currentItem
        // a fetch called in a subgroup returned an item of a different key.
        if (!currentItem || currentItem.key === currentKey) {
          fetch()
        }

        if (done) return

        if (currentItem.key !== currentKey) {
          currentKey = currentItem.key
          const group = generateGroup(currentItem, exchange.getConsumer())
          group.next() // ensure finally
          yield [currentItem.key, group]
        }
      }
    } finally {
      noNewIterables = true
      returnIterator()
    }
  }

  return generateGroups()
}

export default iterableCurry(groupBy, false, 0, 1)
