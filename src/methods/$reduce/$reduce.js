import { $iteratorSymbol, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $reduce(iterable, initial, reducer) {
  let c = 0;
  let result = initial;
  const iterator = iterable[$iteratorSymbol]();
  try {
    if (initial === undefined) {
      const firstResult = $await(iterator.next());
      if (firstResult.done) {
        throw new Error('Cannot reduce: no initial value specified and iterable was empty');
      }
      result = firstResult.value;
      c = 1;
    }
    let nextItem;
    while (!(nextItem = $await(iterator.next())).done) {
      result = $await(reducer(result, nextItem.value, c++));
    }
    return result;
  } finally {
    // close the iterator in case of exceptions
    if (typeof iterator.return === 'function') $await(iterator.return());
  }
}

export default $iterableCurry($reduce, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
});
