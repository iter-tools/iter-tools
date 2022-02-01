/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$first-or.test.ts#1643837503063
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { firstOr } from 'iter-tools-es';
import { wrap } from '../../../test/helpers.js';

describe('firstOr', () => {
  describe('when iterable is empty', () => {
    it('returns whenEmpty', () => {
      expect(firstOr(0, null)).toBe(0);
      expect(firstOr(0, undefined)).toBe(0);
      expect(firstOr(0, wrap([]))).toBe(0);
    });
  });

  describe('when iterable has values', () => {
    it('returns first value', () => {
      expect(firstOr(null, wrap([1, 2, 3]))).toBe(1);
    });
  });
});
