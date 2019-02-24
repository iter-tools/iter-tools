import { iterableCurry } from './internal/iterable'
import { Exchange } from './internal/queues'

function groupBy (key = (k) => k, iterable) {
  const iterator = iterable[Symbol.iterator]()

  let iterableCounter = 0
  let noNewIterables = false
  const exchange = new Exchange()
  const consumer = exchange.getConsumer()
  let done = false
  // let doneValue

  function fetch () {
    // fetch new item from Iterator
    // return the item and advance the
    // main queue consumer
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
      // doneValue = newItem.value
      return
    }
    exchange.push(newItem.value)
    return newItem.value
  }

  function returnIterator () {
    if (noNewIterables && iterableCounter === 0) {
      if (typeof iterator.return === 'function') iterator.return()
    }
  }

  function * generateGroup (firstItem, itemKey, cons) {
    try {
      iterableCounter++
      yield 'ready' // the function generator is ready

      yield firstItem

      while (true) {
        if (!cons.isEmpty()) {
          const newItem = cons.shift()
          if (key(newItem) !== itemKey) {
            return
          }
          yield newItem
        } else if (done) {
          return
          // return doneValue
        } else {
          const newItem = fetch()
          if (key(newItem) !== itemKey) {
            return
          }
          consumer.shift()
          yield newItem
        }
      }
    } finally {
      iterableCounter--
      returnIterator()
    }
  }

  function * generateGroups () {
    let currentKey = {} // always false if compared with anything
    try {
      while (true) {
        if (consumer.isEmpty()) {
          fetch()
        }
        const item = consumer.shift()
        console.log(item)
        if (done) {
          return
        }
        const itemKey = key(item)
        if (currentKey !== itemKey) {
          currentKey = itemKey
          const group = generateGroup(item, itemKey, consumer.clone())
          group.next()
          yield [currentKey, group]
        }
      }
    } finally {
      noNewIterables = true
      returnIterator()
    }
  }

  return generateGroups()
}

export default iterableCurry(groupBy, 1, 2)
