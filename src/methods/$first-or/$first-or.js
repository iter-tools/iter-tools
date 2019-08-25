import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $ensureIterable, $iterableCurry } from '../../internal/$iterable';

$async;
function $firstOr(whenEmpty, iterable) {
  const iter = $ensureIterable(iterable)[$iteratorSymbol]();
  const { value, done } = $await(iter.next());

  if (done) return whenEmpty;

  if (typeof iter.return === 'function') $await(iter.return());

  return value;
}

export default $iterableCurry($firstOr, {
  reduces: true,
});
