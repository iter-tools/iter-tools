import { empty } from './internal/iterable';

const { hasOwnProperty } = Object.prototype;

export default function entries(entriesable) {
  return {
    *[Symbol.iterator]() {
      if (entriesable == null) {
        return empty();
      } else if (typeof entriesable.entries === 'function') {
        yield* entriesable.entries();
      } else if (typeof entriesable === 'object') {
        // pojo
        for (let key in entriesable) {
          if (hasOwnProperty.call(entriesable, key)) {
            yield [key, entriesable[key]];
          }
        }
      }
    },
  };
}
