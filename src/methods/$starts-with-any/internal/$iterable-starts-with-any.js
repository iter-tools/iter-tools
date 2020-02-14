import { $async, $await } from '../../../../generate/async.macro';

import { $firstOr } from '../../$first-or/$first-or';

const none = {};

$async;
export function $iterableStartsWithAny(iterable, values, equals) {
  const first = $await($firstOr(iterable, none));

  if (first === none) return false;

  for (const value of values) {
    if (equals(value, first)) return true;
  }
  return false;
}
