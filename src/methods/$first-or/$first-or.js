import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $firstOr(iterable, whenEmpty) {
  const iter = iterable[$iteratorSymbol]();
  const { value, done } = $await(iter.next());

  if (done) return whenEmpty;

  if (typeof iter.return === 'function') $await(iter.return());

  return value;
}

export default $iterableCurry($firstOr, {
  reduces: true,
});
