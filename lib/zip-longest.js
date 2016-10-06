var iter = require('./iter');

function* zipLongest(filler) {
  var next, i, zipped;
  var iters = Array.prototype.slice.call(arguments, 1).map(function (i) { return iter(i); });
  var numberOfExausted;
  while (true) {
    zipped = [];
    numberOfExausted = 0;
    for (var i = 0; i < iters.length; i++) {
      next = iters[i].next();
      if (next.done) {
        numberOfExausted++;
      }
      zipped.push(next.done ? filler : next.value);
    }
    if (iters.length === numberOfExausted) {
      return;
    }
    yield zipped;
  }
}

module.exports = zipLongest;
