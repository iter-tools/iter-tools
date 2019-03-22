import { asyncIterableCurry } from './internal/async-iterable'
import { Exchange } from './internal/queues'

const UNIQUE_INITIAL_KEY = {}

function asyncSplitBy (getKey = (k) => k, iterable) {
  const iterator = iterable[Symbol.asyncIterator]()

  let itemIndex = 0
  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  let done = false
  let groups = []
  let fetchKey = UNIQUE_INITIAL_KEY

  // fetch new item from Iterator
  // return the item and advance the
  // main queue consumer
  // it also clone the head of the queue when the key changes
  async function fetch () {
    const newItem = await iterator.next()
    if (newItem.done) {
      done = true
      return
    }
    const key = await getKey(newItem.value, itemIndex++)
    const consumer = exchange.getConsumer()
    exchange.push({ value: newItem.value, key })
    if (key !== fetchKey) {
      fetchKey = key
      groups.push({ consumer, key })
    }
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
  async function * generateGroup (groupNumber) {
    try {
      iterableCounter++
      yield 'ensure finally'

      while (true) {
        const group = groups[groupNumber]
        if (!group || group.consumer.isEmpty()) {
          if (done) return
          await fetch()
          continue
        }
        const nextItem = group.consumer.shift()
        if (nextItem.key !== group.key) {
          return
        }
        yield nextItem.value
      }
    } finally {
      groups[groupNumber] = undefined
      iterableCounter--
      await returnIterator()
    }
  }

  // generate group returning
  function * generateGroups () {
    let groupCounter = 0
    try {
      while (true) {
        const group = generateGroup(groupCounter++)
        group.next() // ensure finally
        yield group
      }
    } finally {
      noNewIterables = true
      returnIterator() // no await
    }
  }

  return generateGroups()
}

export default asyncIterableCurry(asyncSplitBy, false, 0, 1)
