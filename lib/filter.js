var iter = require('./iter');

function filter(func, iterable) {
  function* curriedFilter(i) {
    for (var item of iter(i)) {
      if (func(item)) {
        yield item;
      }
    }
  }
  if (iterable) {
    return curriedFilter(iterable);
  }
  return curriedFilter;
}

module.exports = filter;
