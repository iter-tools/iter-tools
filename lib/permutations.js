var iter = require('./iter');
var map = require('./map');
var range = require('./range');
var tee = require('./tee');
var product = require('./product');


function* permutations(iterable, r) {
  var permutation;
  var arr = Array.from(iterable);
  var mapToIndex = map(function (i) { return arr[i]; });
  var n = arr.length;
  r = r || n;
  if (r > n) return;
  for (let indices of product(...tee(range(n), r))) {
    permutation = Array.from(mapToIndex(indices));
    if (new Set(permutation).size === r) {
      yield permutation;
    }
  }
}

module.exports = permutations;
