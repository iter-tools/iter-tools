import { asyncWrap, asyncIterableCurry, asyncCallReturn } from '../../internal/async-iterable.js';
import { CircularBuffer } from '../../internal/circular-buffer.js';

export async function* generateBuffered(source, n) {
  const iterator = asyncWrap(source)[Symbol.asyncIterator]();
  const buffer = new CircularBuffer(n + 1);

  try {
    for (let i = 0; i < n; i++) {
      // Async generators have an internal step request queue, which this fills up
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
    await asyncCallReturn(iterator);
  }
}

export async function* asyncBuffer(source, n) {
  const bufferGen = generateBuffered(source, n)[Symbol.asyncIterator]();

  await bufferGen.next(); // primed

  yield* bufferGen;
}

export default /*#__PURE__*/ asyncIterableCurry(asyncBuffer, {
  validateArgs([n]) {
    if (typeof n !== 'number' || n <= 0) {
      throw new Error('The first argument (bufferSize) should be a number greater than 0');
    }
  },
});
