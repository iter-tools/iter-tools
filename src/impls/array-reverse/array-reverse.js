import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* _arrayReverse(source) {
  if (source == null) return;
  for (let i = source.length - 1; i >= 0; i--) {
    yield source[i];
  }
}

export function arrayReverse(source) {
  if (!(Array.isArray(source) || typeof source === 'string' || source == null)) {
    throw new Error('arrayReverse only works arrays and strings');
  }
  return _arrayReverse(source);
}

export default /*#__PURE__*/ wrapWithResultIterable(arrayReverse);
