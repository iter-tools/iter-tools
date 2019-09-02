import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $__method__(iterable) {
  $await;
  for (const item of iterable) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export default $iterableCurry($__method__);
