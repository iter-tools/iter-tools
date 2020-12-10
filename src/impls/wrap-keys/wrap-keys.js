import { wrapWithIterableIterator } from '../../internal/iterable.js';

export function* __wrapKeys(keysable) {
  if (keysable != null) {
    yield* keysable.keys();
  }
}

export const wrapKeys = /*#__PURE__*/ wrapWithIterableIterator(__wrapKeys);
