import { ensureIterable } from '../../internal/iterable';

function* multiply(iterable1, iterable2) {
  for (const item1 of iterable1) {
    for (const item2 of iterable2) {
      yield item1.concat(item2);
    }
  }
}

function* empty() {}

export default function product(...args) {
  const iters = args.map(i => Array.from(ensureIterable(i)));
  return {
    [Symbol.iterator]() {
      if (iters.length === 0) return empty();
      let currentIter = [[]];
      for (const it of iters) {
        currentIter = multiply(currentIter, it);
      }
      return currentIter;
    },
    getSize() {
      if (iters.length === 0) return 0;
      const lengths = iters.map(iter => iter.length);

      return lengths.reduce((acc, value) => acc * value, 1);
    },
  };
}
