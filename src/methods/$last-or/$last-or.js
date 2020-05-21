import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $lastOr(iterable, whenEmpty) {
  let _item = whenEmpty;

  $await;
  for (const item of iterable) {
    _item = item;
  }

  return _item;
}

export default $iterableCurry($lastOr, {
  reduces: true,
});
