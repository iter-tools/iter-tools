const iter = require('./iter')

function reduceIter (cb, acc, iterable) {
  function * _iter (iterable) {
    iterable = iter(iterable)
    let c = 0
    for (const item of iterable) {
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
