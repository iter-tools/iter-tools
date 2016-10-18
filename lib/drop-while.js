var iter = require('./iter');

function dropWhile(func, iterable) {
  function* curriedDropWhile(i) {
    var drop = true;
    for (var item of iter(i)) {
      if (!drop) {
        yield item;
      } else {
        drop = func(item);
        if (!drop) {
          yield item;
        }
      }
    }
  }
  if (iterable) {
    return curriedDropWhile(iterable);
  }
  return curriedDropWhile;
}

module.exports = dropWhile;
