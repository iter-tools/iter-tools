import { $async, $await } from '../../../generate/async.macro';

import toArray from '../$to-array/to-array';

$async;
export function* $joinWith_(iterable, { subseq }, on) {
  const _on = subseq ? toArray(on) : [on];

  let isFirst = true;

  $await;
  for (const item of iterable) {
    if (!isFirst) yield* _on;
    yield* item;
    isFirst = false;
  }
}
