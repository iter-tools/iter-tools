const map = require('./map')

function flatMap (func, iterable) {
  const mapIter = map(func)
  async function * curriedFlatMap (i) {
    for await (const item of mapIter(i)) {
      yield * item
    }
  }
  if (iterable) {
    return curriedFlatMap(iterable)
  }
  return curriedFlatMap
}

module.exports = flatMap
