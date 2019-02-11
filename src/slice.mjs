import CircularBuffer from './internal/circular-buffer'
import { iterableCurry } from './internal/iterable'

function bufferedSlice (iterable, start, end, step) {
  const bufferSize = Math.abs(start)
  const buffer = new CircularBuffer(bufferSize)
  let counter = 0

  for (let item of iterable) {
    buffer.push(item)
    counter++
  }

  let newEnd
  if (isFinite(end) && end > 0) {
    newEnd = end - (counter - bufferSize)
    if (newEnd < 0) return []
  } else {
    newEnd = end
  }
  return simpleSlice(buffer, 0, newEnd, step)
}

function * simpleSlice (iterable, start, end, step) {
  let currentPos = 0
  let nextValidPos = start
  const bufferSize = Math.abs(end)
  let buffer
  let counter = 0

  if (end < 0) {
    buffer = new CircularBuffer(bufferSize)
  }

  for (let item of iterable) {
    if (buffer) {
      item = buffer.push(item)
      counter++
      if (counter <= bufferSize) {
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

function * slice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = opts.step === undefined ? 1 : opts.step
  end = opts.end === undefined ? Infinity : opts.end
  start = opts.start ? opts.start : 0

  if (step <= 0) {
    throw new TypeError('Cannot slice with step <= 0')
  }

  if (start >= 0) {
    yield * simpleSlice(iterable, start, end, step)
  } else {
    yield * bufferedSlice(iterable, start, end, step)
  }
}

export default iterableCurry(slice)
