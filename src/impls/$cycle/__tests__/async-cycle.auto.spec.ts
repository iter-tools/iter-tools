/**
 * @generated-from ./async-cycle.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncCycle, asyncSlice } from '@iter-tools/es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncCycle', () => {
  describe('when source is empty', () => {
    it('yields no values', async () => {
      expect(await asyncUnwrap(asyncCycle(null))).toEqual([]);
      expect(await asyncUnwrap(asyncCycle(undefined))).toEqual([]);
      expect(await asyncUnwrap(asyncCycle([]))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    it('yields those values repeatedly forever', async () => {
      expect(await asyncUnwrap(asyncSlice(0, 7, asyncCycle(asyncWrap([1, 2, 3]))))).toEqual([
        1,
        2,
        3,
        1,
        2,
        3,
        1,
      ]);
    });
  });
});
