import { $async } from '../../../generate/async.macro';

import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable';

$async;
export function* $concat(...sources) {
  for (const iterable of sources) {
    yield* $ensureIterable(iterable);
  }
}

export default $wrapWithResultIterable($concat);
