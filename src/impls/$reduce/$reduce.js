import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $reduce(iterable, initial, reducer) {
  let c = 0;
  let result = initial;
  const peekr = $await($peekerate(iterable));
  try {
    if (initial === undefined) {
      if (peekr.done) {
        throw new Error('Cannot reduce: no initial value specified and iterable was empty');
      }
      result = peekr.value;
      $await(peekr.advance());
      c = 1;
    }
    while (!peekr.done) {
      result = $await(reducer(result, peekr.value, c++));
      $await(peekr.advance());
    }
    return result;
  } finally {
    // close the iterator in case of exceptions
    peekr.return();
  }
}

export default /*#__PURE__*/ $iterableCurry($reduce, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
});
