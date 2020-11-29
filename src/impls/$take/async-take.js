/**
 * @generated-from ./$take.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* asyncTake(iterable, n) {
  let i = 0;
  for await (const value of iterable) {
    if (i++ === n) break;
    yield value;
  }
}

export default /*#__PURE__*/ asyncIterableCurry(asyncTake);
