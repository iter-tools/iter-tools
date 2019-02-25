import { iterableCurry } from './internal/iterable'

function * groupBy (key = (k) => k, iterable) {
  const iterator = iterable[Symbol.iterator]()

  let currentItem
  let currentKey, previousKey

  function * group () {
    while (true) {
      yield currentItem.value
      currentItem = iterator.next()
      if (currentItem.done) return
      currentKey = key(currentItem.value)
      if (previousKey !== currentKey) {
        return
      }
    }
  };

  try {
    currentItem = iterator.next()

    while (true) {
      if (currentItem.done) return
      currentKey = key(currentItem.value)
      if (previousKey !== currentKey) {
        previousKey = currentKey
        yield [currentKey, group()]
      } else {
        currentItem = iterator.next()
      }
    }
  } finally { // calling close on the main iterable, closes the input iterable
    if (typeof iterator.return === 'function') iterator.return()
  }
}

export default iterableCurry(groupBy, false, 0, 1)
