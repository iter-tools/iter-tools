import CircularBuffer from './internal/circular-buffer'
import { ensureAsyncIterable } from './internal/async-iterable'
import { curry } from './internal/curry'

async function bufferedSlice (iterable, start, end, step) {
  const bufferSize = Math.abs(start)

  const buffer = new CircularBuffer(bufferSize)
  for await (const item of iterable) {
    buffer.push(item)
  }

  let newEnd
  if (isFinite(end) && end > 0) {
    newEnd = end - (buffer.counter - bufferSize)
    if (newEnd < 0) return []
  } else {
    newEnd = end
  }
  return simpleSlice(buffer, 0, newEnd, step)
}

async function * simpleSlice (iterable, start, end, step) {
  let currentPos = 0
  let nextValidPos = start
  const bufferSize = Math.abs(end)
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

async function * asyncSlice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = opts.step === undefined ? 1 : opts.step
  end = opts.end === undefined ? Infinity : opts.end
  start = opts.start ? opts.start : 0
  iterable = ensureAsyncIterable(iterable)

  if (step <= 0) {
    throw new TypeError('Cannot slice with step <= 0')
  }

  if (start >= 0) {
    yield * simpleSlice(iterable, start, end, step)
  } else {
    yield * await bufferedSlice(iterable, start, end, step)
  }
}

export default curry(asyncSlice)
