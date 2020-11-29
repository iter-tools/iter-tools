import { CircularBuffer } from './circular-buffer.js';
import { AsyncIterableIterator } from './async-iterable-iterator.js';

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
      .then(async (step) => (step.done ? step : { value: await mapFn(step.value), done: false }));

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
        // Recurse, filling the buffer with steps from the source
        return this.next();
      }
    }
  }
}
