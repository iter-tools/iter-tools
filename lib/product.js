var iter = require('./iter');
var map = require('./map');

function product() {
  var iters = Array.prototype.map.call(arguments, function (i) { return iter(i); });

  function* multiply(iterable1, iterable2) {
    // console.log('x', Array.from(iterable2))
    for (var item1 of iterable1) {
      for (var item2 of iterable2) {
        yield item1.concat(item2);
      }
    }
  }

  if (iters.length === 0) {
    return function* () {};
  } else {
    var currentIter = [[]];
    for (var it of iters) {
      currentIter = multiply(currentIter, Array.from(it));
    //  currentIter = multiply(currentIter, it);
    }
    return currentIter;
  }
}

module.exports = product;
