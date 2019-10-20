import { empty, wrapWithMethodIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

export function* keys(obj) {
  if (obj == null) {
    return empty();
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        yield key;
      }
    }
  } else {
    throw new Error('the argument to keys() was not an object, null, or undefined');
  }
}

export default wrapWithMethodIterable(keys);
