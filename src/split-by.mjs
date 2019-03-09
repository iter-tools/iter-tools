import { iterableCurry } from './internal/iterable'
import { Exchange } from './internal/queues'

function splitBy (getKey = (k) => k, iterable) {
  const iterator = iterable[Symbol.iterator]()

  let itemIndex = 0
  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  const consumer = exchange.getConsumer()
  let done = false
  let groups = []

  // using an empty object as initial key:
  // it is surely different from any possible key
  let fetchKey = {}

  // fetch new item from Iterator
  // return the item and advance the
  // main queue consumer
  // it also clone the head of the queue when the key changes
  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
      return
    }
    const key = getKey(newItem.value, itemIndex++)
    exchange.push({ value: newItem.value, key })
    if (key !== fetchKey) {
      fetchKey = key
      groups.push({ consumer: consumer.clone(), key })
    }
    consumer.shift() // main consumer forllows the queue
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
  function * generateGroup (groupNumber) {
    try {
      iterableCounter++
      // the function generator is ready.
      // *1*: I use this trick to ensure that finally is called
      yield 'ready'

      while (true) {
        const group = groups[groupNumber]
        if (!group || group.consumer.isEmpty()) {
          if (done) return
          fetch()
          continue
        }
        const nextItem = group.consumer.shift()
        if (nextItem.key !== group.key) {
          return // see *2*
        }
        yield nextItem.value
      }
    } finally {
      groups[groupNumber] = undefined
      iterableCounter--
      returnIterator()
    }
  }

  // generate group returning
  function * generateGroups () {
    let groupCounter = 0
    try {
      while (true) {
        const group = generateGroup(groupCounter++)
        group.next() // see *1*
        yield group
      }
    } finally {
      noNewIterables = true
      returnIterator()
    }
  }

  return generateGroups()
}

export default iterableCurry(splitBy, false, 0, 1)
