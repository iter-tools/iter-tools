/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$spliterate.js#1643837503100
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { PartsIterator } from '../../internal/parts-iterator.js';
import { __map } from '../$map/map.js';
import { __wrap } from '../$wrap/wrap.js';

export function __spliterate(source, strategy, options = {}) {
  return new PartsIterator(source, strategy, options);
}

export const spliterate = /*#__PURE__*/ iterableCurry(
  function $spliterate(...args) {
    return __map(__spliterate(...args), __wrap);
  },
  {
    minArgs: 1,
    maxArgs: 2,
    growRight: true,
  },
);
