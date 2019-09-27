import { $isAsync, $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $lastOr(iterable, whenEmpty) {
  if (!$isAsync && Array.isArray(iterable)) {
    return iterable[iterable.length - 1];
  }

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
