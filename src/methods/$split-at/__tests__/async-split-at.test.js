/**
 * @generated-from ./$split-at.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncSplitAt } from '../../..';
import { asyncWrap, asyncUnwrapDeep } from '../../../test/async-helpers';

describe('asyncSplitAt', () => {
  describe('with positive index', () => {
    it('works when the halves are consumed in order', async () => {
      const [first, second] = asyncSplitAt(3, asyncWrap([0, 1, 2, 3, 4, 5]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });

    it('works when the source is exhuasted while the first half is being consumed', async () => {
      const [first, second] = asyncSplitAt(3, asyncWrap([0, 1]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1], []]);
    });

    it('works when the source is exhuasted while the second half is being consumed', async () => {
      const [first, second] = asyncSplitAt(3, asyncWrap([0, 1, 2, 3]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1, 2], [3]]);
    });
  });

  describe('with negative index', () => {
    it('works when the halves are consumed in order', async () => {
      const [first, second] = asyncSplitAt(-3, asyncWrap([0, 1, 2, 3, 4, 5]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });

    it('all values are in the first part when |index| is larger than source size', async () => {
      const [first, second] = asyncSplitAt(-3, asyncWrap([0, 1]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1], []]);
    });
  });
});
