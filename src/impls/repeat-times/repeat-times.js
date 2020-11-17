import { curry } from '../../internal/curry.js';
import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* repeatTimes(n, item) {
  while (n--) {
    yield item;
  }
}

export default /*#__PURE__*/ curry(wrapWithResultIterable(repeatTimes), repeatTimes.length);
