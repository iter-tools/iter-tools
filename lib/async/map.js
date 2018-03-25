const asyncIter = require('./async-iter')

function map (func, iterable) {
  async function * curriedMap (i) {
    let c = 0
    for await (const item of asyncIter(i)) {
      yield func(item, c++)
    }
  }
  if (iterable) {
    return curriedMap(iterable)
  }
  return curriedMap
}

module.exports = map
