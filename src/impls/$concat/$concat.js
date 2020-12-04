import { $async } from '../../../generate/async.macro.cjs';

import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';

$async;
export function* $__concat(...sources) {
  for (const iterable of sources) {
    yield* $ensureIterable(iterable);
  }
}

export const $concat = /*#__PURE__*/ $wrapWithResultIterable($__concat);
