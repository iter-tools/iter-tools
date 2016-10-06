var iter = require('./iter');

function* groupby(iterable, key) {
  key = key || function (key) { return key; };
  iterable = iter(iterable);

  var currentItem;
  var currentKey, previousKey;

  function* group() {
    while (true) {
      yield currentItem.value;
      currentItem = iterable.next();
      if (currentItem.done) return;
      currentKey = key(currentItem.value);
      if (previousKey !== currentKey) {
        return;
      }
    }
  };

  currentItem = iterable.next();

  while (true) {
    if (currentItem.done) return;
    currentKey = key(currentItem.value);
    if (previousKey !== currentKey) {
      previousKey = currentKey;
      yield [currentKey, group()];
    }
    else {
      currentItem = iterable.next();
    }
  }
}

module.exports = groupby;
