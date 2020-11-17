import { empty, wrapWithResultIterable } from '../../internal/iterable.js';

export function* wrapValues(valuesable) {
  if (valuesable == null) {
    return empty();
  } else {
    yield* valuesable.values();
  }
}

export default wrapWithResultIterable(wrapValues);
