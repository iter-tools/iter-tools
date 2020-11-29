import { $async, $await } from '../../../generate/async.macro.cjs';
import { $ensureIterable } from '../../internal/$iterable.js';

$async;
export function $toArray(source) {
  const out = [];
  $await;
  for (const value of $ensureIterable(source)) {
    out.push(value);
  }
  return out;
}

export default $toArray;
