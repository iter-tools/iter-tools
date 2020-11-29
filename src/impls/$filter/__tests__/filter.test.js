/**
 * @generated-from ./$filter.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { filter } from '@iter-tools/es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('filter', () => {
  describe('when source is empty', () => {
    it('yields no values', () => {
      const pred = (v: any) => v;
      expect(unwrap(filter(pred, null))).toEqual([]);
      expect(unwrap(filter(pred, undefined))).toEqual([]);
      expect(unwrap(filter(pred, wrap([])))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    it('yields values for which predicate(value, i) returns true', () => {
      expect(unwrap(filter((value, i) => value === i, wrap([1, 1, 2, 3, 5, 8])))).toEqual([
        1,
        2,
        3,
      ]);
    });
  });
});
