import { curry } from '../../internal/curry.js';
import { asyncCallReturn } from '../../internal/async-iterable.js';
import { AsyncIterableIterator } from '../../internal/async-iterable-iterator.js';
import { CircularBuffer } from '../../internal/circular-buffer.js';
import { isPositiveInteger } from '../../internal/number.js';
import { isAsyncIterable } from '../is-async-iterable/is-async-iterable.js';
import { isIterable } from '../../internal/iterable.js';

async function* empty() {}

function getIterator(iterable) {
  if (iterable == null) {
    return empty();
  } else if (isAsyncIterable(iterable)) {
    return iterable[Symbol.asyncIterator]();
  } else if (isIterable(iterable)) {
    return iterable[Symbol.iterator]();
  } else {
    throw new Error(`asyncBuffer expected an iterable but received ${iterable}.`);
  }
}

export class Bufferator extends AsyncIterableIterator {
  constructor(iterable, concurrency) {
    super();
    this.iterator = getIterator(iterable);
    this.buffer = new CircularBuffer(concurrency);

    while (!this.buffer.isFull()) {
      this.buffer.push(Promise.resolve(this.iterator.next()));
    }
  }

  async next() {
    const { buffer, iterator } = this;

    return await buffer.push(Promise.resolve(iterator.next()));
  }

  async return() {
    return await asyncCallReturn(this.iterator);
  }
}

export function __asyncBuffer(source, n) {
  return new Bufferator(source, n);
}

export const asyncBuffer = /*#__PURE__*/ curry(function asyncBuffer(n, source) {
  if (n === undefined) return;
  if (n !== Infinity && !isPositiveInteger(n)) {
    throw new Error('Concurrency must be an integer > 0');
  } else if (n > 1024) {
    /**
     * When concurrency is n, this code will always make at least n promises.
     * n - 1 of those promises will always be created after the promise that
     * will eventually resolve with { done: true }. Therefore concurrency must
     * have limits, and it will usually be sensible to keep it in the 2 - 32 range.
     */
    throw new Error('Concurrency argument to asyncBuffer must be <= 1024');
  }
  return __asyncBuffer(source, n);
});
