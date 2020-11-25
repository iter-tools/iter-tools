/**
 * @generated-from ./async-window.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncWindow } from '../../..';
import { asyncWrap, asyncUnwrapDeep, anyType } from '../../../test/async-helpers';

describe('asyncWindow', () => {
  describe('when source is empty', () => {
    it('yields no windows', async () => {
      expect(await asyncUnwrapDeep(asyncWindow(3, null))).toEqual([]);
      expect(await asyncUnwrapDeep(asyncWindow(3, undefined))).toEqual([]);
      expect(await asyncUnwrapDeep(asyncWindow(3, asyncWrap([])))).toEqual([]);
    });
  });

  describe('when size(source) < size', () => {
    it('yields no windows', async () => {
      expect(await asyncUnwrapDeep(asyncWindow(3, asyncWrap([1, 2])))).toEqual([]);
    });
  });

  describe('when size(source) === size', () => {
    it('yields one full window', async () => {
      expect(await asyncUnwrapDeep(asyncWindow(3, asyncWrap([1, 2, 3])))).toEqual([[1, 2, 3]]);
    });
  });

  describe('when size(source) > size', () => {
    it('yields partial windows, then size(source)-size full windows', async () => {
      expect(await asyncUnwrapDeep(asyncWindow(2, asyncWrap([1, 2, 3])))).toEqual([
        [1, 2],
        [2, 3],
      ]);
    });
  });

  describe('when size is invalid', () => {
    it('throws a validation error', async () => {
      expect(() => asyncWindow(anyType(''), asyncWrap([]))).toThrowErrorMatchingSnapshot();
    });
  });
});
