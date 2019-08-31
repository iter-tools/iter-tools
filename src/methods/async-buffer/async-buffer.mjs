import { asyncify, asyncIterableCurry } from '../../internal/async-iterable';
import { Queue } from '../../internal/queues';

export async function* asyncBuffer(iterable, bufferSize) {
  const iterator = asyncify(iterable)[Symbol.asyncIterator]();
  const buffer = new Queue();

  try {
    for (let i = 0; i < bufferSize; i++) {
      // Async generators have an internal item request queue, which this fills up
      buffer.push(iterator.next());
    }
    while (true) {
      buffer.push(iterator.next());
      const { done, value } = await buffer.shift();
      if (done) return;
      yield value;
    }
  } finally {
    if (typeof iterator.return === 'function') await iterator.return();
  }
}

export default asyncIterableCurry(asyncBuffer, {
  validateArgs([bufferSize]) {
    if (typeof bufferSize !== 'number' || bufferSize <= 0) {
      throw new Error('The first argument (bufferSize) should be a number greater than 0');
    }
  },
});
