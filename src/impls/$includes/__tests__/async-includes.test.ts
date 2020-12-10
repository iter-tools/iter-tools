/**
 * @generated-from ./$includes.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIncludes } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncIncludes', () => {
  describe('when iterable includes value', () => {
    it('returns true', async () => {
      expect(await asyncIncludes(1, asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncIncludes(2, asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncIncludes(3, asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable does not include value', () => {
    it('returns false', async () => {
      expect(await asyncIncludes(4, asyncWrap([1, 2, 3]))).toBe(false);
      expect(await asyncIncludes(null, asyncWrap([1, 2, 3]))).toBe(false);
    });
  });

  describe('when iterable is empty', () => {
    it('returns false', async () => {
      expect(await asyncIncludes(undefined, asyncWrap([]))).toBe(false);
    });
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it('uses same value to do comparison', async () => {
      expect(await asyncIncludes(same, -2, asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncIncludes(() => false, 2, asyncWrap([1, 2, 3]))).toBe(false);
    });
  });
});
