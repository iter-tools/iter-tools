import { wrapWithResultIterable } from '../../internal/iterable.js';

const { hasOwnProperty } = Object.prototype;

export function* __objectEntries(obj) {
  if (obj == null) return;

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      yield [key, obj[key]];
    }
  }
}

export const objectEntries = /*#__PURE__*/ wrapWithResultIterable(__objectEntries, {
  validateArgs(args) {
    if (!(args[0] == null || typeof args[0] === 'object')) {
      throw new Error('obj argument to objectEntries must be an object, null, or undefined');
    }
  },
});
