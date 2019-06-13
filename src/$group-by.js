import { $async, $await, $iteratorSymbol } from '../generate/async.macro';

import { $iterableCurry } from './internal/$iterable';
import splitBy from './internal/$split-by';

$async;
function* cons(item, iterable) {
  yield item;
  yield* iterable;
}

$async;
function car(iterable) {
  const iterator = iterable[$iteratorSymbol]();
  const { done, value } = $await(iterator.next());
  if (done) return [];
  return [value, iterator];
}

$async;
function* $groupBy(getKey, iterable) {
  const _getKey = getKey || (k => k);
  $await;
  for (const subseq of splitBy(_getKey, iterable)) {
    const [first, rest] = $await(car(subseq));
    if (rest === undefined) return;
    const key = $await(_getKey(first));
    yield [key, cons(first, rest)];
  }
}

export default $iterableCurry($groupBy);
