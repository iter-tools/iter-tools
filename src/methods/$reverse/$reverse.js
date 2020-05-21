import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { $toArray } from '../$to-array/$to-array';

$async;
export function* $reverse(source) {
  yield* $await($toArray(source)).reverse();
}

export default $iterableCurry($reverse);
