/**
 * @generated-from ./$consume.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable.js';

export function __consume(iterable) {
  /* eslint-disable */
  // prettier-ignore
  for (const _ of iterable) {}
  /* eslint-enable */
}

export const consume = /*#__PURE__*/ iterableCurry(__consume, {
  reduces: true,
});
