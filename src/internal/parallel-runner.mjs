import { CircularBuffer } from './circular-buffer';
import { AsyncIterableIterator } from './async-iterable-iterator';

export class ParallelRunner extends AsyncIterableIterator {
  constructor(iterable, mapFn, concurrency) {
    super();
    this.iterator = iterable[Symbol.asyncIterator]();
    this.buffer = new CircularBuffer(concurrency - 1);
    this.mapFn = mapFn;
  }

  next() {
    const { buffer, mapFn } = this;
    const done = this.__done;

    const promise = this.iterator
      .next()
      .then(async (item) => (item.done ? item : { value: await mapFn(item.value), done: false }));

    const displacedPromise = buffer.push(promise);

    if (displacedPromise) {
      // Base case: buffer is full
      return displacedPromise;
    } else {
      if (done) {
        // Base case: iterable ran out.
        // Note that we may still make a few more next calls while waiting
        // for the first promise which is going to resolve { done: true },
        // but this should be OK.
        return promise;
      } else {
        // Recurse, filling the buffer with items from the source
        return this.next();
      }
    }
  }
}
