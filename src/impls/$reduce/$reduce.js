import { $iteratorSymbol, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $callReturn } from '../../internal/$iterable.js';

$async;
export function $reduce(iterable, initial, reducer) {
  let c = 0;
  let result = initial;
  let done = false;
  const iterator = iterable[$iteratorSymbol]();
  try {
    if (initial === undefined) {
      const firstResult = $await(iterator.next());
      if (firstResult.done) {
        done = true;
        throw new Error('Cannot reduce: no initial value specified and iterable was empty');
      }
      result = firstResult.value;
      c = 1;
    }
    let nextItem;
    while (!(nextItem = $await(iterator.next())).done) {
      result = $await(reducer(result, nextItem.value, c++));
    }
    done = nextItem.done;
    return result;
  } finally {
    // close the iterator in case of exceptions
    if (!done) $await($callReturn(iterator));
  }
}

export default /*#__PURE__*/ $iterableCurry($reduce, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
});
