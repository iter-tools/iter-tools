import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $takeLastOr(iterable, whenEmpty) {
  let _item = whenEmpty;

  $await;
  for (const item of iterable) {
    _item = item;
  }

  return _item;
}

export default $iterableCurry($takeLastOr, {
  reduces: true,
});
