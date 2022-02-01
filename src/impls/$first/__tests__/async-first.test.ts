/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$first.test.ts#1643837503064
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncFirst } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncFirst', () => {
  describe('when iterable is empty', () => {
    it('returns undefined', async () => {
      expect(await asyncFirst(null)).toBe(undefined);
      expect(await asyncFirst(undefined)).toBe(undefined);
      expect(await asyncFirst(asyncWrap([]))).toBe(undefined);
    });
  });

  describe('when iterable has values', () => {
    it('returns first value', async () => {
      expect(await asyncFirst(asyncWrap([1, 2, 3]))).toBe(1);
    });
  });
});
