import { wrapWithResultIterable } from '../../internal/iterable.js';

const { hasOwnProperty } = Object.prototype;

export function* __objectKeys(obj) {
  if (obj == null) {
    return;
  }

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      yield key;
    }
  }
}

export const objectKeys = /*#__PURE__*/ wrapWithResultIterable(__objectKeys, {
  validateArgs(args) {
    if (!(args[0] == null || typeof args[0] === 'object')) {
      throw new Error('obj argument to objectKeys must be an object, null, or undefined');
    }
  },
});
