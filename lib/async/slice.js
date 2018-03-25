const asyncIter = require('./async-iter')

function slice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = typeof opts.step === 'undefined' ? 1 : opts.step
  end = typeof opts.end === 'undefined'
    ? (step > 0 ? Infinity : -Infinity) : opts.end
  start = opts.start ? opts.start : 0

  async function * curriedSlice (iterable) {
    let currentPos = 0
    let nextValidPos = start

    for await (const item of asyncIter(iterable)) {
      if (currentPos >= end) {
        break
      }

      if (nextValidPos === currentPos) {
        yield item
        nextValidPos += step
      }
      currentPos++
    }
  }

  if (iterable) {
    return curriedSlice(iterable)
  }

  return curriedSlice
}

module.exports = slice
