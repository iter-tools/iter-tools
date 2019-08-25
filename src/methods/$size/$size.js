import { $async, $await } from '../../../generate/async.macro';

import { $ensureIterable } from '../../internal/$iterable';

const TypedArrayProto = Object.getPrototypeOf(Int8Array);

$async;
function $size(iterable) {
  const iter = $ensureIterable(iterable);
  if (Array.isArray(iter)) return iter.length;
  if (iter instanceof Map || iter instanceof Set) return iter.size;
  if (Object.getPrototypeOf(iter) === TypedArrayProto) return iter.length;
  let size = 0;
  /* eslint-disable no-unused-vars */
  $await;
  for (const _ of iter) {
    /* eslint-enable no-unused-vars */
    size++;
  }
  return size;
}

export default $size;
