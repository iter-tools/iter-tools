import { $async, $await } from '../../../generate/async.macro.cjs';
import { $ensureIterable } from '../../internal/$iterable.js';

$async;
export function $__toArray(source) {
  const out = [];
  $await;
  for (const value of source) {
    out.push(value);
  }
  return out;
}

export function $toArray(source) {
  return $__toArray($ensureIterable(source));
}
