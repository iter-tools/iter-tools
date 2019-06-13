import { $async } from '../generate/async.macro';

import { $ensureIterable } from './internal/$iterable';

$async;
function* $concat(...iterables) {
  for (const iterable of iterables) {
    yield* $ensureIterable(iterable);
  }
}

export default $concat;
