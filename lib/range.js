function * range (opts) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 }
    : (typeof opts === 'object' ? opts : {})
  step = typeof opts.step === 'undefined' ? 1 : opts.step
  end = typeof opts.end === 'undefined'
    ? (step > 0 ? Infinity : -Infinity) : opts.end
  start = opts.start ? opts.start : 0

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i
  }
}

module.exports = range
