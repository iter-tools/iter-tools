/**
 * @generated-from ./$take.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable.js';

export function* __take(iterable, n) {
  let i = 0;
  for (const value of iterable) {
    if (i++ === n) break;
    yield value;
  }
}

export const take = /*#__PURE__*/ iterableCurry(__take);
