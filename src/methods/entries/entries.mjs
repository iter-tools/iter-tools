import { empty, wrapWithMethodIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

export function* entries(entriesable) {
  if (entriesable == null) {
    return empty();
  } else if (typeof entriesable.entries === 'function') {
    yield* entriesable.entries();
  } else if (typeof entriesable === 'object') {
    // pojo
    for (const key in entriesable) {
      if (hasOwnProperty.call(entriesable, key)) {
        yield [key, entriesable[key]];
      }
    }
  }
}

export default wrapWithMethodIterable(entries);
