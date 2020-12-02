import { wrapWithResultIterable } from '../../internal/iterable.js';

export function* repeat(value) {
  while (true) {
    yield value;
  }
}

export default /*#__PURE__*/ wrapWithResultIterable(repeat);
