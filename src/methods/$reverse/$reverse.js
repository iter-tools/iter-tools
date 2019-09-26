import { $isAsync, $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { $toArray } from '../$to-array/$to-array';

$async;
export function* $reverse(iterable) {
  let array = iterable;
  if ($isAsync || !Array.isArray(array)) {
    array = $await($toArray(array));
  }

  for (let i = array.length - 1; i >= 0; i--) {
    yield array[i];
  }
}

export default $iterableCurry($reverse);
