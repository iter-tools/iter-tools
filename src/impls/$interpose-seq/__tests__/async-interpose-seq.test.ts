/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interpose-seq.test.ts#1643837503075
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncInterposeSeq } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncInterposeSeq', () => {
  describe('when source is empty', () => {
    it('yields no values', async () => {
      expect(await asyncUnwrap(asyncInterposeSeq('', null))).toEqual([]);
      expect(await asyncUnwrap(asyncInterposeSeq('', undefined))).toEqual([]);
      expect(await asyncUnwrap(asyncInterposeSeq('', asyncWrap([])))).toEqual([]);
    });
  });

  describe('when source contains a single value', () => {
    it('yields that value', async () => {
      const iter = asyncInterposeSeq(asyncWrap([null, null]), asyncWrap([1]));
      expect(await asyncUnwrap(iter)).toEqual([1]);
    });
  });

  describe('when source contains multiple values', () => {
    it('yields interposeSubseqd value between each value from source', async () => {
      const iter = asyncInterposeSeq(asyncWrap([null, null]), asyncWrap([1, 2, 3]));
      expect(await asyncUnwrap(iter)).toEqual([1, null, null, 2, null, null, 3]);
    });
  });
});
