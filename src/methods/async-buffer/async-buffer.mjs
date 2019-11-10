import { asyncify, asyncIterableCurry } from '../../internal/async-iterable';
import { Queue } from '../../internal/queue';

export async function* generateBuffered(source, n) {
  const iterator = asyncify(source)[Symbol.asyncIterator]();
  const buffer = new Queue();

  try {
    for (let i = 0; i < n; i++) {
      // Async generators have an internal item request queue, which this fills up
      buffer.push(iterator.next());
    }

    yield 'primed';

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

export async function* asyncBuffer(source, n) {
  const bufferGen = generateBuffered(source, n)[Symbol.asyncIterator]();

  await bufferGen.next(); // primed

  yield* bufferGen;
}

export default asyncIterableCurry(asyncBuffer, {
  validateArgs([n]) {
    if (typeof n !== 'number' || n <= 0) {
      throw new Error('The first argument (bufferSize) should be a number greater than 0');
    }
  },
});
