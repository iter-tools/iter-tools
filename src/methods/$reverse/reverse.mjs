/**
 * @generated-from ./$reverse.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable';
import { toArray } from '../$to-array/to-array';

export function* reverse(source) {
  yield* toArray(source).reverse();
}

export default iterableCurry(reverse);
