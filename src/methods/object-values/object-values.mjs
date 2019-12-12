import { wrapWithMethodIterable } from '../../internal/iterable';

const { hasOwnProperty } = Object.prototype;

export function* objectValues(obj) {
  if (obj == null) {
    return;
  }

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      yield obj[key];
    }
  }
}

export default wrapWithMethodIterable(objectValues, {
  validateArgs(args) {
    if (!(args[0] == null || typeof args[0] === 'object')) {
      throw new Error('the argument to objectValues was not an object, null, or undefined');
    }
  },
});
