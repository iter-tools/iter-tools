import CircularBuffer from './internal/circular-array'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import asyncToArray from './async-to-array'

async function * simpleSlice (iterable, start, end, step) {
  let currentPos = 0
  let nextValidPos = start
  let bufferSize = Math.abs(end)
  let buffer

  if (end < 0) {
    buffer = new CircularBuffer(bufferSize)
  }

  for await (let item of iterable) {
    if (buffer) {
      item = buffer.push(item)
      if (buffer.counter <= bufferSize) {
        continue
      }
    }

    if (currentPos >= end && end >= 0) {
      break
    }

    if (nextValidPos === currentPos) {
      yield item
      nextValidPos += step
    }
    currentPos++
  }
}

async function * slice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = typeof opts.step === 'undefined' ? 1 : opts.step
  end = typeof opts.end === 'undefined' ? Infinity : opts.end
  start = opts.start ? opts.start : 0
  iterable = ensureAsyncIterable(iterable)

  if (step <= 0) {
    throw new TypeError('Cannot slice with step <= 0')
  }

  if (start >= 0) {
    yield * simpleSlice(iterable, start, end, step)
  } else {
    const array = await asyncToArray(iterable)
    start = start < 0 ? array.length + start : start
    end = end < 0 && isFinite(end) ? array.length + end : end

    yield * simpleSlice(array, start, end, step)
  }
}

export default function curriedSlice (opts, iterable) {
  if (arguments.length === 1) {
    return iterable => slice(opts, iterable)
  }

  return slice(opts, iterable)
}
