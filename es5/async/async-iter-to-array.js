'use strict';

var asyncIter = require('./async-iter');

async function asyncIterToArray(iterable) {
  var out = [];
  for await (var item of asyncIter(iterable)) {
    console.log(item);
    out.push(item);
  }
  return out;
}

module.exports = asyncIterToArray;