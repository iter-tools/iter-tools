import { $async, $await } from '../../../generate/async.macro';
import { $ensureIterable } from '../../internal/$iterable';

$async;
export function $toObject(iterable, proto = Object.prototype) {
  const obj = Object.create(proto);
  $await;
  for (const [key, value] of $ensureIterable(iterable)) {
    obj[key] = value;
  }
  return obj;
}

export default $toObject;
