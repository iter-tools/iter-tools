import { $async, $await } from '../../../generate/async.macro';
import { $ensureIterable } from '../../internal/$iterable';

$async;
export function $toArray(source) {
  const out = [];
  $await;
  for (const item of $ensureIterable(source)) {
    out.push(item);
  }
  return out;
}

export default $toArray;
