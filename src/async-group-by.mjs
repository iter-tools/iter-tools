import { asyncIterableCurry } from './internal/async-iterable'
import { Exchange } from './internal/queues'

function asyncGroupBy (getKey = (k) => k, iterable) {
  const iterator = iterable[Symbol.asyncIterator]()

  let itemIndex = 0
  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  const consumer = exchange.getConsumer()
  let done = false
  let currentItem

  // fetch new item from Iterator
  // return the item and advance the
  // main queue consumer
  async function fetch () {
    const newItem = await iterator.next()
    if (newItem.done) {
      done = true
      return
    }
    exchange.push({ value: newItem.value, key: await getKey(newItem.value, itemIndex++) })
    currentItem = consumer.shift()
  }

  // close the original iterator if possible
  async function returnIterator () {
    if (noNewIterables && iterableCounter === 0) {
      if (typeof iterator.return === 'function') await iterator.return()
    }
  }

  // generate subgroup where adjacent items have the same key
  // it picks up new item from the buffer. Every instance has
  // its own independent consumer
  async function * generateGroup (firstItem, cons) {
    try {
      iterableCounter++
      // the function generator is ready.
      // *1*: I use this trick to ensure that finally is called
      yield 'ready'

      yield firstItem.value

      while (true) {
        if (cons.isEmpty()) {
          await fetch()
          if (done) return
          continue
        }
        const nextItem = cons.shift()
        if (nextItem.key !== firstItem.key) {
          return // see *2*
        }
        yield nextItem.value
      }
    } finally {
      iterableCounter--
      await returnIterator()
    }
  }

  // generate group returning [key, subgroup]
  // it always picks up new items from the Iterator (fetch)
  async function * generateGroups () {
    // using an empty object as initial key:
    // it is surely different from any possible key
    let currentKey = {}
    try {
      while (true) {
        // I need to fetch a new item if currentItem is undefined (first time)
        // or
        // currentItem.key === currentKey that means that currentItem
        // a fetch called in a subgroup returned an item of a different key. see *2*
        if (!currentItem || currentItem.key === currentKey) {
          await fetch()
        }

        if (done) return

        if (currentItem.key !== currentKey) {
          currentKey = currentItem.key
          const group = generateGroup(currentItem, consumer.clone())
          await group.next() // see *1*
          yield [currentItem.key, group]
        }
      }
    } finally {
      noNewIterables = true
      await returnIterator()
    }
  }

  return generateGroups()
}

export default asyncIterableCurry(asyncGroupBy, 1, 2)
