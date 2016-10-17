var iter = require('./iter');

function reduce(iterable, cb, acc) {
  iterable = iter(iterable);
  var c = 0;
  for (var item of iterable) {
    acc = cb(acc, item, c++);
  }
  return acc;
}

module.exports = reduce;
