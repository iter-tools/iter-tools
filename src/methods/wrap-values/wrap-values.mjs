import { empty, wrapWithMethodIterable } from '../../internal/iterable';

export function* wrapValues(valuesable) {
  if (valuesable == null) {
    return empty();
  } else {
    yield* valuesable.values();
  }
}

export default wrapWithMethodIterable(wrapValues);
