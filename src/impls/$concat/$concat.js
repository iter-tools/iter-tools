import { $async } from '../../../generate/async.macro.cjs';

import { $wrapWithIterableIterator, $ensureIterable } from '../../internal/$iterable.js';

$async;
export function* $__concat(...sources) {
  for (const iterable of sources) {
    yield* $ensureIterable(iterable);
  }
}

export const $concat = /*#__PURE__*/ $wrapWithIterableIterator($__concat);
