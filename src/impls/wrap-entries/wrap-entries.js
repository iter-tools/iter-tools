import { empty, wrapWithResultIterable } from '../../internal/iterable.js';

export function* wrapEntries(entriesable) {
  if (entriesable == null) {
    return empty();
  } else {
    yield* entriesable.entries();
  }
}

export default wrapWithResultIterable(wrapEntries);
