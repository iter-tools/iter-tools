/**
 * @generated-from ./$first.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { firstOr } from '../$first-or/first-or';
import { iterableCurry } from '../../internal/iterable';
export function first(iterable) {
  return firstOr(iterable, undefined);
}
export default iterableCurry(first, {
  reduces: true,
});
