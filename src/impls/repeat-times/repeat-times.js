import { curry } from '../../internal/curry.js';
import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* repeatTimes(n, value) {
  while (n--) {
    yield value;
  }
}

export default /*#__PURE__*/ curry(wrapWithResultIterable(repeatTimes), repeatTimes.length);
