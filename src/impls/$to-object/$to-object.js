import { $async, $await } from '../../../generate/async.macro.cjs';
import { $ensureIterable } from '../../internal/$iterable.js';

$async;
export function $__toObject(iterable, proto = Object.prototype) {
  const obj = Object.create(proto);
  $await;
  for (const [key, value] of iterable) {
    obj[key] = value;
  }
  return obj;
}

export function $toObject(iterable, proto) {
  return $__toObject($ensureIterable(iterable), proto);
}
