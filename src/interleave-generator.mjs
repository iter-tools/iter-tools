import { ensureIterable } from './internal/iterable'

class InterleaveBuffer {
  constructor (iterator) {
    this._iterator = iterator
    this._next = this._iterator.next()
  }

  take () {
    if (this._next.done) {
      return undefined
    }

    const { value } = this._next
    this._next = this._iterator.next()
    return value
  }

  canTake () {
    return !this._next.done
  }
}

export default function interleaveGenerator (...iterables) {
  return generatorFn => {
    return (function * () {
      const iterators = iterables.map(iterable => ensureIterable(iterable)[Symbol.iterator]())
      const buffers = iterators.map(iterator => new InterleaveBuffer(iterator))
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
