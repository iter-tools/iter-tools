import { empty, wrapWithMethodIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

function* keys(keysable) {
  if (keysable == null) {
    return empty();
  } else if (typeof keysable.keys === 'function') {
    yield* keysable.keys();
  } else if (typeof keysable === 'object') {
    // pojo
    for (let key in keysable) {
      if (hasOwnProperty.call(keysable, key)) {
        yield key;
      }
    }
  }
}

export default wrapWithMethodIterable(keys);
