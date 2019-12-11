import { CircularBuffer } from './circular-buffer';
import { AsyncIteratorProxy } from './async-iterator-proxy';

export class ParallelRunner extends AsyncIteratorProxy {
  constructor(iterator, mapFn, concurrency) {
    super(iterator);
    this.buffer = new CircularBuffer(concurrency - 1);
    this.mapFn = mapFn;
  }

  next() {
    const { buffer, mapFn } = this;
    const done = this.__done;

    const promise = super
      .next()
      .then(async item => (item.done ? item : { value: await mapFn(item.value), done: false }));

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
