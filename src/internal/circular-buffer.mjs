export default class CircularBuffer {
  constructor (size) {
    this.array = new Array(size)
    this._size = size
    this.counter = 0
  }

  push (newItem) {
    this.counter++
    const currentItem = this.array[this.counter % this._size]
    this.array[this.counter % this._size] = newItem
    return currentItem
  }
}
