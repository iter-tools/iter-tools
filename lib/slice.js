var iter = require('./iter');

function slice(opts, iterable) {
  var start, step, end;
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts;

  step = typeof opts.step === 'undefined' ? 1 : opts.step;
  end = typeof opts.end === 'undefined' ? Infinity : opts.end;
  start = typeof opts.start === 'undefined' ? 0 : opts.start;

  function* curriedSlice(iterable) {
    var currentPos = 0;
    var nextValidPos = start;

    for (var item of iter(iterable)) {
      if (currentPos >= end) {
        break;
      }

      if (nextValidPos === currentPos) {
        yield item;
        nextValidPos += step;
      }
      currentPos++;
    }
  }

  if (iterable) {
    return curriedSlice(iterable);
  }

  return curriedSlice;
}

module.exports = slice;
