/**
 * @generated-from ./async-split-when.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncSplitWhen } from '../../..';
import { asyncWrap, asyncUnwrapDeep } from '../../../test/async-helpers';

describe('asyncSplitWhen', () => {
  describe('when there are no values', () => {
    it('yields empty parts', async () => {
      const [first, second] = asyncSplitWhen((_, i) => i > 0, asyncWrap([]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[], []]);
    });
  });

  describe('when `predicate(value, i)` goes from falsy to truthy', () => {
    it('puts values in each part', async () => {
      const [first, second] = asyncSplitWhen((_, i) => i > 0, asyncWrap([1, 2, 3]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[1], [2, 3]]);
    });
  });

  describe('when `predicate(value, i)` is truthy initially', () => {
    it('puts all the values in the second part', async () => {
      const [first, second] = asyncSplitWhen((v) => v > 0, asyncWrap([1, 2, 3]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[], [1, 2, 3]]);
    });
  });

  describe('when `predicate(value, i)` is never truthy', () => {
    it('puts all the values in the first part', async () => {
      const [first, second] = asyncSplitWhen((_) => null, asyncWrap([1, 2, 3]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[1, 2, 3], []]);
    });
  });
});
