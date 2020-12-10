import { wrapWithIterableIterator } from '../../internal/iterable.js';

export function* __wrapValues(valuesable) {
  if (valuesable != null) {
    yield* valuesable.values();
  }
}

export const wrapValues = /*#__PURE__*/ wrapWithIterableIterator(__wrapValues);
