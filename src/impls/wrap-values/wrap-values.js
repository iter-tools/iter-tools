import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* __wrapValues(valuesable) {
  if (valuesable != null) {
    yield* valuesable.values();
  }
}

export const wrapValues = /*#__PURE__*/ wrapWithResultIterable(__wrapValues);
