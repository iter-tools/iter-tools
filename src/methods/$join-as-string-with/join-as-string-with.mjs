/**
 * @generated-from ./$join-as-string-with.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry, isIterable } from '../../internal/iterable';

export function joinAsStringWith(strings, separator) {
  let result = '';
  let first = true;

  for (const str of strings) {
    if (!first && separator !== '') result += separator;
    if (typeof str !== 'string' && isIterable(str)) {
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

export default iterableCurry(joinAsStringWith, {
  reduces: true,
});
