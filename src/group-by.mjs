import ensureIterable from './internal/ensure-iterable'

function * groupBy (key, iterable) {
  key = key || function (key) { return key }
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

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

export default function curriedGroupBy (key, iterable) {
  if (arguments.length === 1) {
    return iterable => groupBy(key, iterable)
  }
  return groupBy(key, iterable)
}
