function* wrap(iter) {
  for (var item of iter) {
    yield item;
  }
}

function* zip() {
  var next, i, zipped;
  var iters = Array.prototype.map.call(arguments, function (i) { return wrap(i); });
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
