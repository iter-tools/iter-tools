const _sourceBuffer = '@@_sourceBuffer'

class ReadOnlyCircularBuffer {
  constructor (sourceBuffer) {
    this[_sourceBuffer] = sourceBuffer
  }

  get (idx) {
    return this[_sourceBuffer].get(idx)
  }

  get size () {
    return this[_sourceBuffer].size
  }

  isFull () {
    return this[_sourceBuffer].isFull
  }

  [Symbol.iterator] () {
    return this[_sourceBuffer][Symbol.iterator]()
  }
}

export default class CircularBuffer {
  constructor (size) {
    this._array = new Array(size)
    this._size = 0
    this._head = 0
    this.readOnlyCopy = new ReadOnlyCircularBuffer(this)
  }

  push (newItem) {
    const array = this._array
    const head = this._head = (array.length + this._head - 1) % array.length

    const displacedItem = array.length ? array[head] : newItem
    array[head] = newItem

    if (!this.isFull()) {
      this._size++
    } else {
      return displacedItem
    }
    return undefined
  }

  shift () {
    if (this._size > 0) {
      const array = this._array
      --this._size

      return array[(this._head + this._size) % array.length]
    }
  }

  peek () {
    if (this._size > 0) {
      const array = this._array

      return array[(this._head + this._size - 1) % array.length]
    }
  }

  fill (filler) {
    this._array.fill(filler)
    this._size = this._array.length
  }

  get (idx) {
    const array = this._array
    const head = this._head

    const index = (array.length * 2 + head - idx - 1) % array.length
    return array[index]
  }

  get size () {
    return this._size
  }

  get capacity () {
    return this._array.length
  }

  isFull () {
    return this.size === this._array.length
  }

  * [Symbol.iterator] () {
    for (let i = 0; i < this.size; i++) {
      yield this.get(i)
    }
  }
}
