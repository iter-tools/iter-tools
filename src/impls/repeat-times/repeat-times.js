import { curry } from '../../internal/curry.js';
import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* __repeatTimes(n, value) {
  while (n--) {
    yield value;
  }
}

export const repeatTimes = /*#__PURE__*/ curry(
  /*#__PURE__*/ wrapWithResultIterable(__repeatTimes),
  __repeatTimes.length,
);
