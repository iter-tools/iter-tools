import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* wrapValues(valuesable) {
  if (valuesable != null) {
    yield* valuesable.values();
  }
}

export default wrapWithResultIterable(wrapValues);
