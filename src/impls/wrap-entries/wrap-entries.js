import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* wrapEntries(entriesable) {
  if (entriesable != null) {
    yield* entriesable.entries();
  }
}

export default wrapWithResultIterable(wrapEntries);
