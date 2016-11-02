var map = require('./map');

function flatMap(func, iterable) {
  var mapIter = map(func);
  function* curriedFlatMap(i) {
    for (let item of mapIter(i)) {
      yield* item;
    }
  }
  if (iterable) {
    return curriedFlatMap(iterable);
  }
  return curriedFlatMap;
}

module.exports = flatMap;
