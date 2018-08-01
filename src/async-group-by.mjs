import ensureAsyncIterable from './internal/ensure-async-iterable'

async function * groupBy (selector, iterable) {
  selector = selector || function (key) { return key }
  iterable = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()

  let currentItem
  let currentKey, previousKey

  async function * group () {
    while (true) {
      yield currentItem.value
      currentItem = await iterable.next()
      if (currentItem.done) return
      currentKey = selector(currentItem.value)
      if (previousKey !== currentKey) {
        return
      }
    }
  };

  currentItem = await iterable.next()

  while (true) {
    if (currentItem.done) return
    currentKey = selector(currentItem.value)
    if (previousKey !== currentKey) {
      previousKey = currentKey
      yield [currentKey, group()]
    } else {
      currentItem = await iterable.next()
    }
  }
}

export default function curriedGroupBy (selector, iterable) {
  if (typeof iterable === 'undefined') {
    return iterable => groupBy(selector, iterable)
  }
  return groupBy(selector, iterable)
}
