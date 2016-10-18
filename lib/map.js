var iter = require('./iter');

function map(func, iterable) {
  function* curriedMap(i) {
    for (var item of iter(i)) {
      yield func(item);
    }
  }
  if (iterable) {
    return curriedMap(iterable);
  }
  return curriedMap;
}

module.exports = map;
