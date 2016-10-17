var map = require('./map');
var range = require('./range');
var permutations = require('./permutations');

function isSorted(arr) {
  if (arr.length < 2) return true;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i-1] > arr[i]) {
      return false;
    }
  }
  return true;
}

function* combinations(iterable, r) {
  var arr = Array.from(iterable);
  var mapToIndex = map(function (i) { return arr[i]; });
  var n = arr.length;

  for (let indices of permutations(range(n), r)) {
    if (isSorted(indices)) {
      yield Array.from(mapToIndex(indices));
    }
  }
}

module.exports = combinations;
