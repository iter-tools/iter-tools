import { $async, $await } from '../../../../generate/async.macro';

$async;
export function $iterableIncludesAny(iterable, values, compareEquality = Object.is) {
  $await;
  for (const value of iterable) {
    for (const includedValue of values) {
      if (compareEquality(includedValue, value)) return true;
    }
  }
  return false;
}
