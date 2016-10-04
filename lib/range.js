function* range(opts) {
  var start, step, end;
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts;

  step = typeof opts.step === 'undefined' ? 1 : opts.step;
  end = typeof opts.end === 'undefined' ? opts.start : opts.end;
  start = typeof opts.end === 'undefined' ? 0 : opts.start;

  for (var i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

module.exports = range;
