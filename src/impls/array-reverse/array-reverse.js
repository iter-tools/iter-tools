import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* __arrayReverse(source) {
  if (source == null) return;
  for (let i = source.length - 1; i >= 0; i--) {
    yield source[i];
  }
}

export const arrayReverse = /*#__PURE__*/ wrapWithResultIterable(__arrayReverse, {
  validateArgs(args) {
    if (!(Array.isArray(args[0]) || typeof args[0] === 'string' || args[0] == null)) {
      throw new Error('arrayReverse only works arrays and strings');
    }
  },
});
