import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry, $callReturn } from '../../internal/$iterable';

$async;
export function $firstOr(iterable, whenEmpty) {
  const iter = iterable[$iteratorSymbol]();
  const { value, done } = $await(iter.next());

  if (done) return whenEmpty;

  $await($callReturn(iter));

  return value;
}

export default $iterableCurry($firstOr, {
  reduces: true,
});
