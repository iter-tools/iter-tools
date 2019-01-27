import map from './map'
import tee from './tee'
import zip from './zip'
import ensureIterable from './internal/ensure-iterable'

const _queue = Symbol('queue')
const _done = Symbol('done')
const _sourceIterator = Symbol('sourceIterator')
const _returnItem = Symbol('returnValue')
const _forkGenerator = Symbol('forkGenerator')
const _forks = Symbol('forks')
const _forksReturned = Symbol('forksReturned')
const _emittedReturnValue = Symbol('emittedReturnValue')
const maybeCloseSource = Symbol('maybeCloseSource')

class SharedArrayQueue {
  constructor (array) {
    this._array = array
    this._position = 0
  }

  push (value) {
    this._array.push(value)
  }

  poll (value) {
    return this._array[this._position++]
  }

  isEmpty () {
    return this._position === this._array.length
  }
}

class LinkedQueue {
  static makeQueues (arrayQueues) {
    let head = null
    let tail = null

    if (!arrayQueues.length) return []

    const array = arrayQueues[0]._array

    const positionSet = new Set(map(queue => queue._position, arrayQueues))
    const nodesByPosition = new Map()

    for (let i = array.length - 1; i--; i >= 0) {
      head = new LinkedQueueNode(array[i], head)
      tail = tail || head

      if (positionSet.has(i)) {
        nodesByPosition.set(i, head)
      }
    }

    return map(
      pos => new LinkedQueue(nodesByPosition.get(pos), tail),
      positionSet
    )
  }

  push (value) {
    const node = new LinkedQueueNode(value)
    if (this._tail) {
      this._tail._next = node
    } else {
      this._tail = this._head = node
    }
    this._tail = node
  }

  poll (value) {
    const node = this._head
    this._head = node._next
    if (!this._head) {
      this._tail = null
    }
    return node._value
  }

  isEmpty () {
    return this._head === null
  }

  constructor (head, tail) {
    this._head = head
    this._tail = tail
  }
}

class LinkedQueueNode {
  constructor (value, next = null) {
    this._value = value
    this._next = next
  }
}

class ForkedIterable {
  constructor (forkGenerator) {
    this[_forkGenerator] = forkGenerator
    this[_queue] = new SharedArrayQueue(forkGenerator[_queue])

    /**
     * True if this iterator is done emitting values
     */
    this[_done] = false
    /**
     * True if this iterator has emitted a return value. The fork should emit
     * the return value of the source iterator once if the source iterator
     * returned a value, which matches generator behavior.
     */
    this[_emittedReturnValue] = false
  }

  next () {
    const forkGenerator = this[_forkGenerator]
    const done = this[_done]

    if (done) {
      if (this[_emittedReturnValue]) {
        return {
          value: undefined,
          done: true
        }
      } else {
        this[_emittedReturnValue] = true
        return forkGenerator[_returnItem]
      }
    } else {
      const sourceIterator = forkGenerator[_sourceIterator]
      const queue = this[_queue]

      if (queue.isEmpty()) {
        const iteratorItem = sourceIterator.next()

        if (iteratorItem.done) {
          forkGenerator[_returnItem] = iteratorItem
          this[_emittedReturnValue] = true
          this[_done] = true

          // TODO can I just push this into the cache? why not?
          return iteratorItem
        } else {
          queue.push(iteratorItem)
        }
      }

      return queue.poll()
    }
  }

  return (returnVal) {
    if (!this[_done]) {
      const forkGenerator = this[_forkGenerator]

      forkGenerator[_forksReturned]++

      this[_done] = true
      this[_emittedReturnValue] = true

      forkGenerator[maybeCloseSource]()
    }

    return {
      done: true,
      value: returnVal
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

class ForkGenerator {
  constructor (source) {
    this[_sourceIterator] = ensureIterable(source)[Symbol.iterator]()

    /**
     * The fork created so far
     */
    this[_forks] = []
    /**
     * Cache of all values emitted so far from the source
     */
    this[_queue] = []
    /**
     * Whether the fork iterable itself is done, which is to say that no more
     * new forks of the source iterable will be created
     */
    this[_done] = false
    /**
     * `null` if the source iterator is not exhausted, otherwise the
     * `{done: true, ...}` item that it yielded
     */
    this[_returnItem] = null
    /**
     * The number of forks which returned. Used to ensure that `source.return()`
     * is still called when all forks return before exhausting the source.
     *
     * It may not ever reach `forks.length`, nor need it. If `forks.length` is
     * not reached, that means that one fork terminated by exhausting the
     * source, in which case there is no need for a call to `source.return()`
     */
    this[_forksReturned] = 0
  }

  next () {
    if (this[_done]) {
      return {
        value: undefined,
        done: true
      }
    } else {
      const fork = new ForkedIterable(this)
      this[_forks].push(fork)

      return {
        value: fork,
        done: false
      }
    }
  }

  /**
   * ForkGenerator is an infinite generator, so for purposes of correctness it
   * is imperative to avoid leaks that this return method be called when no more
   * forks are needed.
   */
  return (returnVal) {
    if (!this[_done]) {
      this[_done] = true

      const queues = LinkedQueue.makeQueues(
        map(fork => fork[_queue], this[_forks])
      )
      for (const [queue, fork] of zip(this[_forks], queues)) {
        fork[_queue] = queue
      }

      this[maybeCloseSource]()
    }

    return {
      done: true,
      value: returnVal
    }
  }

  /**
   * If all forks have returned prematurely, the source must also be closed
   */
  [maybeCloseSource] () {
    if (this[_done] && this[_forks].length === this[_forksReturned]) {
      this[_sourceIterator].return()
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

export default function fork (iterable, count = Infinity) {
  return count === Infinity ? new ForkGenerator(iterable) : tee(iterable, count)
}
