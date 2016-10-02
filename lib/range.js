function* range(start, end, step) {
  step = typeof step === 'undefined' ? 1 : step;
  var e = typeof end === 'undefined' ? start : end;
  var s = typeof end === 'undefined' ? 0 : start;
  for (var i = s; step > 0 ? i < e : i > e; i += step) {
    yield i;
  }
}

module.exports = range;
