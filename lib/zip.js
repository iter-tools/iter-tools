var iter = require('./iter');

function* zip() {
  var next, i, zipped;
  var iters = Array.prototype.map.call(arguments, function (i) { return iter(i); });
  while (true) {
    zipped = [];
    for (var i = 0; i < iters.length; i++) {
      next = iters[i].next();
      if (next.done) return;
      zipped.push(next.value);
    }
    yield zipped;
  }
}

module.exports = zip;
