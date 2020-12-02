/**
 * @generated-from ./$concat.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { wrapWithResultIterable, ensureIterable } from '../../internal/iterable.js';

export function* concat(...sources) {
  for (const iterable of sources) {
    yield* ensureIterable(iterable);
  }
}

export default /*#__PURE__*/ wrapWithResultIterable(concat);
