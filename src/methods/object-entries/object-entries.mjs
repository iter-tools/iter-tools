import { wrapWithResultIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

export function* objectEntries(obj) {
  if (obj == null) {
    return;
  }

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      yield [key, obj[key]];
    }
  }
}

export default wrapWithResultIterable(objectEntries, {
  validateArgs(args) {
    if (!(args[0] == null || typeof args[0] === 'object')) {
      throw new Error('the argument to objectEntries was not an object, null, or undefined');
    }
  },
});
