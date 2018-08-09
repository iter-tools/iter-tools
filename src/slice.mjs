import ensureIterable from './internal/ensure-iterable'
import Dequeue from 'dequeue'

function * deQueueIter (dequeue) {
  const len = dequeue.length
  for (let i = 0; i < len; i++) {
    yield dequeue.shift()
  }
}

function * slice (opts, iterable) {
  let start, step, end
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts

  step = typeof opts.step === 'undefined' ? 1 : opts.step
  end = typeof opts.end === 'undefined' ? Infinity : opts.end
  start = opts.start ? opts.start : 0
  iterable = ensureIterable(iterable)

  if (start >= 0 && end >= 0) {
    let currentPos = 0
    let nextValidPos = start

    for (const item of iterable) {
      if (currentPos >= end) {
        break
      }

      if (nextValidPos === currentPos) {
        yield item
        nextValidPos += step
      }
      currentPos++
    }
  } else if (start >= 0 && end < 0) {
    let buffer = []
    let currentPos = 0

    for (const item of iterable) {
      if (currentPos >= start) {
        buffer.push(item)
      }
      currentPos++
    }
    buffer = buffer.slice(0, end)
    yield * slice({ step }, buffer)
  } else if (start < 0 && end >= 0) {
    // buffer from 0 to end. Finish iteration after end + abs(start)
    let buffer = []
    let currentPos = 0

    for (const item of iterable) {
      if (currentPos >= end) {
        break
      }
      buffer.push(item)
      currentPos++
    }
    buffer = buffer.slice(start)
    yield * slice({ step }, buffer)
  } else { // (start < 0 && end < 0)
    if (start >= end) {
      return
    }
    const queue = new Dequeue()
    const queueMaxSize = Math.abs(start - end) + Math.abs(end)

    for (const item of iterable) {
      queue.push(item)
      if (queue.length > queueMaxSize) {
        queue.shift()
      }
    }
    yield * slice({start: 0, end: queue.length + end, step}, deQueueIter(queue))
  }
}

export default function curriedSlice (opts, iterable) {
  if (arguments.length === 1) {
    return iterable => slice(opts, iterable)
  }

  return slice(opts, iterable)
}
