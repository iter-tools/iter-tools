/**
 * @generated-from ./$map.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* asyncMap(source, func) {
  let c = 0;
  for await (const value of source) {
    yield await func(value, c++);
  }
}

export default /*#__PURE__*/ asyncIterableCurry(asyncMap);
