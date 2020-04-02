import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $firstOr } from '../$first-or/$first-or';

const none = {};

$async;
export function $startsWithAny(iterable, values, equals = Object.is) {
  const first = $await($firstOr(iterable, none));

  if (first === none) return false;

  for (const value of values) {
    if (equals(value, first)) return true;
  }
  return false;
}

export default $iterableCurry($startsWithAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
