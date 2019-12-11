const _sourceBuffer = '@@_sourceBuffer';

export class ReadOnlyCircularBuffer {
  constructor(sourceBuffer) {
    this[_sourceBuffer] = sourceBuffer;
  }

  get(idx) {
    return this[_sourceBuffer].get(idx);
  }

  peek() {
    return this[_sourceBuffer].peek();
  }

  get size() {
    return this[_sourceBuffer].size;
  }

  get capacity() {
    return this[_sourceBuffer].capacity;
  }

  isFull() {
    return this[_sourceBuffer].isFull();
  }

  [Symbol.iterator]() {
    return this[_sourceBuffer][Symbol.iterator]();
  }
}

export class CircularBuffer {
  constructor(size) {
    this._array = new Array(size);
    this._head = size - 1;
    this.size = 0;
  }

  push(newItem) {
    const array = this._array;
    const head = (this._head = (this._head + 1) % array.length);

    const displacedItem = array[head];
    array[head] = newItem;

    if (this.isFull()) {
      return displacedItem;
    } else {
      this.size++;
      return undefined;
    }
  }

  shift() {
    if (!this.size) return undefined;

    const value = this.get(0);
    this.size--;
    return value;
  }

  peek() {
    return this.get(0);
  }

  fill(filler) {
    this._array.fill(filler);
    this.size = this._array.length;
  }

  get(idx) {
    if (idx >= this.size) return undefined;

    const array = this._array;
    const head = this._head;

    const index = (array.length + head - this.size + 1 + idx) % array.length;
    return array[index];
  }

  get capacity() {
    return this._array.length;
  }

  isFull() {
    return this.size === this._array.length;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.get(i);
    }
  }
}
