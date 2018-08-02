import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * groupBy (selector, iterable) {
  selector = selector || function (key) { return key }
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()

  let currentItem
  let currentKey, previousKey

  async function * group () {
    while (true) {
      yield currentItem.value
      currentItem = await iterator.next()
      if (currentItem.done) return
      currentKey = selector(currentItem.value)
      if (previousKey !== currentKey) {
        return
      }
    }
  }

  try {
    currentItem = await iterator.next()

    while (true) {
      if (currentItem.done) return
      currentKey = selector(currentItem.value)
      if (previousKey !== currentKey) {
        previousKey = currentKey
        yield [currentKey, group()]
      } else {
        currentItem = await iterator.next()
      }
    }
  } finally { // calling close on the main iterable, closes the input iterable
    if (typeof iterator.return === 'function') iterator.return()
  }
}

export default function curriedGroupBy (selector, iterable) {
  if (typeof iterable === 'undefined') {
    return iterable => groupBy(selector, iterable)
  }
  return groupBy(selector, iterable)
}
