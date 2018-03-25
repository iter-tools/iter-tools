const asyncIter = require('./async-iter')

function reduceIter (cb, acc, iterable) {
  async function * _iter (iterable) {
    iterable = asyncIter(iterable)
    let c = 0
    for await (const item of iterable) {
      acc = cb(acc, item, c++)
      yield acc
    }
  }
  if (iterable) {
    return _iter(iterable)
  }
  return _iter
}

module.exports = reduceIter
