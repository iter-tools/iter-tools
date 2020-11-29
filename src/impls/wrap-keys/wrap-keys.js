import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* wrapKeys(keysable) {
  if (keysable != null) {
    yield* keysable.keys();
  }
}

export default wrapWithResultIterable(wrapKeys);
