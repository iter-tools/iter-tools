const asyncIter = require('./async-iter')

function takeWhile (func, iterable) {
  async function * curriedTakeWhile (i) {
    let take = true
    let c = 0
    for await (const item of asyncIter(i)) {
      take = func(item, c++)
      if (take) {
        yield item
      } else {
        break
      }
    }
  }
  if (iterable) {
    return curriedTakeWhile(iterable)
  }
  return curriedTakeWhile
}

module.exports = takeWhile
