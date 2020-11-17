import { $async } from '../../../generate/async.macro.cjs';

import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';

$async;
export function* $concat(...sources) {
  for (const iterable of sources) {
    yield* $ensureIterable(iterable);
  }
}

export default $wrapWithResultIterable($concat);
