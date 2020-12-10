/**
 * @generated-from ./$peekerate.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { ensureIterable } from '../../internal/iterable.js';
import { Peekerator } from '../../internal/peekerator.js';

export function __peekerate(source) {
  return Peekerator.from(source);
}

function wrapWithEnsureIterable(fn) {
  return (source) => fn(ensureIterable(source));
}

export const peekerate = wrapWithEnsureIterable(__peekerate);