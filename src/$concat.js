import { $async } from '../generate/async.macro';

import { $wrapWithMethodIterable, $ensureIterable } from './internal/$iterable';

$async;
function* $concat(...iterables) {
  for (const iterable of iterables) {
    yield* $ensureIterable(iterable);
  }
}

export default $wrapWithMethodIterable($concat);
