/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$spliterate-grouped.js#1643837503099
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { AsyncGroupsIterator } from '../../internal/async-groups-iterator.js';
import { __asyncMap } from '../$map/async-map.js';
import { __asyncWrap } from '../$wrap/async-wrap.js';

export function __asyncSpliterateGrouped(source, strategy, options = {}) {
  return new AsyncGroupsIterator(source, strategy, options);
}

export const asyncSpliterateGrouped = /*#__PURE__*/ asyncIterableCurry(
  function $spliterateGrouped(...args) {
    return __asyncMap(__asyncSpliterateGrouped(...args), __asyncWrap);
  },
  {
    minArgs: 1,
    maxArgs: 2,
    growRight: true,
  },
);
