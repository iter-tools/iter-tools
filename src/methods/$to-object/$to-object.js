import { $async, $await } from '../../../generate/async.macro';
import { $ensureIterable } from '../../internal/$iterable';

$async;
export function $toObject(source) {
  const obj = {};
  $await;
  for (const [key, value] of $ensureIterable(source)) {
    obj[key] = value;
  }
  return obj;
}

export default $toObject;
