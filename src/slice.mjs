import ensureIterable from './internal/ensure-iterable'

function * slice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = typeof opts.step === 'undefined' ? 1 : opts.step
  end = typeof opts.end === 'undefined'
    ? (step > 0 ? Infinity : -Infinity) : opts.end
  start = opts.start ? opts.start : 0
  let currentPos = 0
  let nextValidPos = start

  for (var item of ensureIterable(iterable)) {
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

export default function curriedSlice (opts, iterable) {
  if (!iterable) {
    return iterable => slice(opts, iterable)
  }

  return slice(opts, iterable)
}
