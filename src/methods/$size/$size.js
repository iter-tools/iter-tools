import { $async, $await } from '../../../generate/async.macro';

import { $ensureIterable } from '../../internal/$iterable';

$async;
export function $size(iterable) {
  const iter = $ensureIterable(iterable);
  let size = 0;

  $await;
  // eslint-disable-next-line no-unused-vars
  for (const _ of iter) {
    size++;
  }
  return size;
}

export default $size;
