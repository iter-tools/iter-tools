import { $async, $await } from '../../../../generate/async.macro';

$async;
export function $iterableIncludesAny(iterable, values, compare = Object.is) {
  $await;
  for (const value of iterable) {
    for (const includedValue of values) {
      if (compare(includedValue, value)) return true;
    }
  }
  return false;
}
