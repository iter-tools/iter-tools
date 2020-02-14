import { $async, $await } from '../../../../generate/async.macro';

$async;
export function $allEqual(values, compare) {
  if (!values.length) return true;
  let first = true;
  for (const value of values) {
    if (!first && !$await(compare(values[0], value))) {
      return false;
    }
    first = false;
  }
  return true;
}
