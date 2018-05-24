const iter = require('./iter')

function groupBy (key, iterable) {
  key = key || function (key) { return key }
  function * curriedGroupBy (iterable) {
    iterable = iter(iterable)

    let currentItem
    let currentKey, previousKey

    function * group () {
      while (true) {
        yield currentItem.value
        currentItem = iterable.next()
        if (currentItem.done) return
        currentKey = key(currentItem.value)
        if (previousKey !== currentKey) {
          return
        }
      }
    };

    currentItem = iterable.next()

    while (true) {
      if (currentItem.done) return
      currentKey = key(currentItem.value)
      if (previousKey !== currentKey) {
        previousKey = currentKey
        yield [currentKey, group()]
      } else {
        currentItem = iterable.next()
      }
    }
  }

  if (typeof iterable !== 'undefined') {
    return curriedGroupBy(iterable)
  }
  return curriedGroupBy
}

module.exports = groupBy
