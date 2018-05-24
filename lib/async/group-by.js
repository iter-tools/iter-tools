const asyncIter = require('./async-iter')

function groupBy (key, iterable) {
  key = key || function (key) { return key }
  async function * curriedGroupBy (iterable) {
    iterable = asyncIter(iterable)

    let currentItem
    let currentKey, previousKey

    async function * group () {
      while (true) {
        yield currentItem.value
        currentItem = await iterable.next()
        if (currentItem.done) return
        currentKey = key(currentItem.value)
        if (previousKey !== currentKey) {
          return
        }
      }
    };

    currentItem = await iterable.next()

    while (true) {
      if (currentItem.done) return
      currentKey = key(currentItem.value)
      if (previousKey !== currentKey) {
        previousKey = currentKey
        yield [currentKey, group()]
      } else {
        currentItem = await iterable.next()
      }
    }
  }

  if (typeof iterable !== 'undefined') {
    return curriedGroupBy(iterable)
  }
  return curriedGroupBy
}

module.exports = groupBy
