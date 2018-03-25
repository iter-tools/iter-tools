'use strict';

var asyncIter = require('./async-iter');

async function reduce(iterable, cb, acc) {
  iterable = asyncIter(iterable);
  var c = 0;
  for await (var item of iterable) {
    acc = cb(acc, item, c++);
  }
  return acc;
}

module.exports = reduce;