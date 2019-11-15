import { empty, wrapWithResultIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

export function* values(obj) {
  if (obj == null) {
    return empty();
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        yield obj[key];
      }
    }
  } else {
    throw new Error('the argument to values() was not an object, null, or undefined');
  }
}

export default wrapWithResultIterable(values);
