/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$take-while.test.ts#1643837503110
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { takeWhile } from 'iter-tools-es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('takeWhile', () => {
  describe('when source is empty', () => {
    it('yields no values', () => {
      expect(unwrap(takeWhile((value: any) => value, null))).toEqual([]);
      expect(unwrap(takeWhile((value: any) => value, undefined))).toEqual([]);
      expect(unwrap(takeWhile((value: any) => value, wrap([])))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    it('yields values while the result of predicate(value, i) is truthy', () => {
      expect(unwrap(takeWhile((value) => value === 2, wrap([2, 2, 3, 2])))).toEqual([2, 2]);
      expect(unwrap(takeWhile((_value, i) => i < 0, wrap([2, 2])))).toEqual([]);
    });
  });
});
