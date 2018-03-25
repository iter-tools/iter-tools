const asyncIter = require('./async-iter')

async function * groupby (iterable, key) {
  key = key || function (key) { return key }
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

module.exports = groupby
