function* count(start, step) {
  step = typeof step === 'undefined' ? 1 : step;
  start = typeof start === 'undefined' ? 0 : start;
  var i = start;
  while (true) {
    yield i;
    i += step;
  }
}

module.exports = count;
