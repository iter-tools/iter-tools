import { empty, wrapWithMethodIterable } from '../../internal/iterable';

export function* wrapKeys(keysable) {
  if (keysable == null) {
    return empty();
  } else {
    yield* keysable.keys();
  }
}

export default wrapWithMethodIterable(wrapKeys);
