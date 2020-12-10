import { wrapWithIterableIterator } from '../../internal/iterable.js';

export function* __repeat(value) {
  while (true) {
    yield value;
  }
}

export const repeat = /*#__PURE__*/ wrapWithIterableIterator(__repeat);
