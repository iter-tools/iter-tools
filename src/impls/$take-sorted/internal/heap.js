import { defaultCompare } from '../../../internal/compare.js';

// Adapted from sithmel's little-ds-toolkit/lib/heap.js

function swap(arr, x, y) {
  const tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
}

export class Heap {
  constructor(compare = defaultCompare) {
    this.compare = compare;
    this.data = [];
  }

  static getParentIndex(i) {
    return i % 2 ? (i - 1) / 2 : Math.floor((i - 1) / 2);
  }

  static getLeftIndex(i) {
    return 2 * i + 1;
  }

  static getRightIndex(i) {
    return 2 * i + 2;
  }

  _bubbleUp(i) {
    const { data, compare } = this;
    let parentIndex;
    while (i > 0) {
      parentIndex = Heap.getParentIndex(i);
      if (compare(data[i], data[parentIndex]) < 0) {
        swap(this.data, i, parentIndex);
        i = parentIndex;
      } else {
        return i;
      }
    }
  }

  _heapify(i) {
    const { data, compare } = this;

    const lIdx = Heap.getLeftIndex(i);
    const rIdx = Heap.getRightIndex(i);
    const leftIsSmaller = this.has(lIdx) ? compare(data[lIdx], data[i]) < 0 : false;
    const rightIsSmaller = this.has(rIdx) ? compare(data[rIdx], data[i]) < 0 : false;
    if (leftIsSmaller && rightIsSmaller) {
      if (compare(data[lIdx], data[rIdx]) < 0) {
        swap(this.data, lIdx, i);
        return lIdx;
      } else {
        swap(this.data, rIdx, i);
        return rIdx;
      }
    } else if (leftIsSmaller) {
      swap(this.data, lIdx, i);
      return lIdx;
    } else if (rightIsSmaller) {
      swap(this.data, rIdx, i);
      return rIdx;
    }
  }

  _bubbleDown(i) {
    const { size } = this;
    while (i !== null && i < size) {
      i = this._heapify(i);
    }
  }

  push(value) {
    this.data.push(value);
    this._bubbleUp(this.size - 1);
  }

  pop() {
    if (!this.size) return;
    const root = this.data[0];

    const last = this.data.pop();

    if (this.size > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return root;
  }

  has(idx) {
    return idx > 0 && idx < this.size;
  }

  get size() {
    return this.data.length;
  }
}
