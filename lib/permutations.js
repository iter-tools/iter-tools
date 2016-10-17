var iter = require('./iter');
var map = require('./map');
var range = require('./range');
var tee = require('./tee');
var product = require('./product');


function* permutations(iterable, r) {
  var arr = Array.from(iterable);
  var mapToIndex = map(function (i) { return arr[i]; });
  var n = arr.length;
  r = r || n;
  if (r > n) return;
  for (let indices of product(...tee(range(n), r))) {
    if (new Set(indices).size === r) {
      yield Array.from(mapToIndex(indices));
    }
  }
}

module.exports = permutations;
