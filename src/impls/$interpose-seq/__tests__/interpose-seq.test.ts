/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interpose-seq.test.ts#1643837503075
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { interposeSeq } from 'iter-tools-es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('interposeSeq', () => {
  describe('when source is empty', () => {
    it('yields no values', () => {
      expect(unwrap(interposeSeq('', null))).toEqual([]);
      expect(unwrap(interposeSeq('', undefined))).toEqual([]);
      expect(unwrap(interposeSeq('', wrap([])))).toEqual([]);
    });
  });

  describe('when source contains a single value', () => {
    it('yields that value', () => {
      const iter = interposeSeq(wrap([null, null]), wrap([1]));
      expect(unwrap(iter)).toEqual([1]);
    });
  });

  describe('when source contains multiple values', () => {
    it('yields interposeSubseqd value between each value from source', () => {
      const iter = interposeSeq(wrap([null, null]), wrap([1, 2, 3]));
      expect(unwrap(iter)).toEqual([1, null, null, 2, null, null, 3]);
    });
  });

  describe('when source is a string', () => {
    it('warns', () => {
      interposeSeq(wrap([null, null]), 'abc');
      expect(console.warn).callsMatchSnapshot();
    });
  });
});
