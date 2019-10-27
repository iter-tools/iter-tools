import { $async, $await } from '../../../generate/async.macro';

import { $ensureIterable } from '../../internal/$iterable';
import { getStaticSize } from './internal/get-static-size';

$async;
export function $size(iterable) {
  const _iterable = $ensureIterable(iterable);

  const staticSize = getStaticSize(iterable);
  if (staticSize !== null) {
    return staticSize;
  }

  let size = 0;
  /* eslint-disable no-unused-vars */
  $await;
  for (const _ of _iterable) {
    size++;
  }
  /* eslint-enable no-unused-vars */

  return size;
}

export default $size;
