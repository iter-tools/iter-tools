import { $async, $await } from '../../../generate/async.macro';
import { $ensureIterable } from '../../internal/$iterable';

$async;
function $toArray(iterable) {
  const out = [];
  $await;
  for (const item of $ensureIterable(iterable)) {
    out.push(item);
  }
  return out;
}

export default $toArray;
