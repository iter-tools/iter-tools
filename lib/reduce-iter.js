var iter = require('./iter');

function reduceIter(cb, acc, iterable) {
  function* _iter(iterable) {
    iterable = iter(iterable);
    var c = 0;
    for (var item of iterable) {
      acc = cb(acc, item, c++);
      yield [item, acc];
    }
  }
  if (iterable) {
    return _iter(iterable);
  }
  return _iter;
}

module.exports = reduceIter;
