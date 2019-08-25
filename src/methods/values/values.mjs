import { empty, wrapWithMethodIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

function* values(valuesable) {
  if (valuesable == null) {
    return empty();
  } else if (typeof valuesable.values === 'function') {
    yield* valuesable.values();
  } else if (typeof valuesable === 'object') {
    // pojo
    for (let key in valuesable) {
      if (hasOwnProperty.call(valuesable, key)) {
        yield valuesable[key];
      }
    }
  }
}

export default wrapWithMethodIterable(values);
