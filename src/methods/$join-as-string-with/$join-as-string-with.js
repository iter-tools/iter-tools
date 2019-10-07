import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $joinAsStringWith(strings, separator) {
  let result = '';
  let first = true;

  $await;
  for (const str of strings) {
    if (!first && separator !== '') result += separator;
    result += str;
    first = false;
  }
  return result;
}

export default $iterableCurry($joinAsStringWith, {
  reduces: true,
});
