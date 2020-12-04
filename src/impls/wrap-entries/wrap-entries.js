import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* __wrapEntries(entriesable) {
  if (entriesable != null) {
    yield* entriesable.entries();
  }
}

export const wrapEntries = /*#__PURE__*/ wrapWithResultIterable(__wrapEntries);
