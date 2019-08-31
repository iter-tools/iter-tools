import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $map(iterable, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    yield $await(func(item, c++));
  }
}

export default $iterableCurry($map);
