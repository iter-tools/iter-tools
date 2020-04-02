import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $includesAny(iterable, values, compareEquality = Object.is) {
  $await;
  for (const value of iterable) {
    for (const includedValue of values) {
      if (compareEquality(includedValue, value)) return true;
    }
  }
  return false;
}

export default $iterableCurry($includesAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
