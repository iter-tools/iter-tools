/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$join-with-seq.js#1643837503079
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { __toArray } from '../$to-array/to-array.js';

export function* __joinWithSeq(source, separatorSeq) {
  const _separatorSeq = __toArray(separatorSeq);
  let isFirst = true;

  for (const value of source) {
    if (!isFirst) yield* _separatorSeq;
    yield* value;
    isFirst = false;
  }
}

export const joinWithSeq = /*#__PURE__*/ iterableCurry(__joinWithSeq);
