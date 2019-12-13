import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry, $isIterable } from '../../internal/$iterable';

$async;
export function $joinAsStringWith(strings, separator) {
  let result = '';
  let first = true;

  $await;
  for (const str of strings) {
    if (!first && separator !== '') result += separator;
    if (typeof str !== 'string' && $isIterable(str)) {
      $await;
      for (const character of str) {
        result += character;
      }
    } else {
      result += str;
    }
    first = false;
  }
  return result;
}

export default $iterableCurry($joinAsStringWith, {
  reduces: true,
});
