import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $__method__(iterable) {
  let _item;

  $await;
  for (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export default $iterableCurry($__method__, {
  reduces: true,
});
