import { $async, $await } from '../../../../generate/async.macro';

$async;
export function $allEqual(values, compareEquality) {
  if (!values.length) return true;
  let first = true;
  for (const value of values) {
    if (!first && !$await(compareEquality(values[0], value))) {
      return false;
    }
    first = false;
  }
  return true;
}
