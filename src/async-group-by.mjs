import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncGroupBy (selector = (key) => key, iterable) {
  const iterator = iterable[Symbol.asyncIterator]()

  let currentItem
  let currentKey, previousKey

  async function * group () {
    while (true) {
      yield currentItem.value
      currentItem = await iterator.next()
      if (currentItem.done) return
      currentKey = await selector(currentItem.value)
      if (previousKey !== currentKey) {
        return
      }
    }
  }

  try {
    currentItem = await iterator.next()

    while (true) {
      if (currentItem.done) return
      currentKey = await selector(currentItem.value)
      if (previousKey !== currentKey) {
        previousKey = currentKey
        yield [currentKey, group()]
      } else {
        currentItem = await iterator.next()
      }
    }
  } finally { // calling close on the main iterable, closes the input iterable
    if (typeof iterator.return === 'function') await iterator.return()
  }
}

export default asyncIterableCurry(asyncGroupBy, 1, 2)
