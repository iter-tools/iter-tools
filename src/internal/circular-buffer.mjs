export default class CircularBuffer {
  constructor (size) {
    this.array = new Array(size)
    this._size = size
    this.counter = 0
  }

  push (newItem) {
    this.counter++
    const index = this.counter % this._size
    const currentItem = this.array[index]
    this.array[index] = newItem
    return currentItem
  }

  * [Symbol.iterator] () {
    let counter = this.counter
    for (let i = 0; i < this._size; i++) {
      counter++
      yield this.array[counter % this._size]
    }
  }
}
