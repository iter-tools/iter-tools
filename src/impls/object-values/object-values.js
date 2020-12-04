import { wrapWithResultIterable } from '../../internal/iterable.js';

const { hasOwnProperty } = Object.prototype;

export function* __objectValues(obj) {
  if (obj == null) {
    return;
  }

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      yield obj[key];
    }
  }
}

export const objectValues = /*#__PURE__*/ wrapWithResultIterable(__objectValues, {
  validateArgs(args) {
    if (!(args[0] == null || typeof args[0] === 'object')) {
      throw new Error('obj argument to objectValues must be an object, null, or undefined');
    }
  },
});
