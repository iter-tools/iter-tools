import { ensureIterable } from './internal/iterable'
import map from './map'

class InterleaveBuffer {
  constructor (iterator) {
    this._iterator = iterator
    this._next = this._iterator.next()
  }

  take () {
    const next = this._next
    if (next.done) {
      return undefined
    }

    this._next = this._iterator.next()
    return next.value
  }

  canTake () {
    return this._next.done ? null : this
  }
}

export default function interleaveGenerator (generatorFn) {
  return (...iterables) => {
    return (function * () {
      const iterators = map(iterable => ensureIterable(iterable)[Symbol.iterator](), iterables)
      const buffers = Array.from(map(iterator => new InterleaveBuffer(iterator), iterators))
      const canTakeAny = () => buffers.find(buffer => buffer.canTake())
      try {
        yield * generatorFn(canTakeAny, ...buffers)
      } finally {
        for (const buffer of buffers) {
          if (buffer.canTake() && typeof buffer._iterator.return === 'function') {
            buffer._iterator.return()
          }
        }
      }
    })()
  }
}
