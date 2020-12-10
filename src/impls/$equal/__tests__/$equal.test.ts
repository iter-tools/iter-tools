import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $equal } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`equal`, () => {
  describe('when there is only one iterable', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($equal(null))).toBe(true);
        expect($await($equal(undefined))).toBe(true);
        expect($await($equal($wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when all values in all iterables are equal', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($equal($wrap([]), $wrap([])))).toBe(true);
        expect($await($equal(null, undefined))).toBe(true);
        expect($await($equal(null, undefined, $wrap([])))).toBe(true);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when all values in some iterables are equal', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 4])))).toBe(false);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 4]), $wrap([1, 2, 3])))).toBe(false);
        expect($await($equal($wrap([1, 2, 4]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterables have the same values but different lengths', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($equal($wrap([1]), $wrap([1]), $wrap([1, 2])))).toBe(false);
        expect($await($equal($wrap([1]), $wrap([1, 2]), $wrap([1])))).toBe(false);
        expect($await($equal($wrap([1, 2]), $wrap([1]), $wrap([1])))).toBe(false);
        expect($await($equal($wrap([]), $wrap([]), $wrap([1])))).toBe(false);
        expect($await($equal($wrap([]), $wrap([1]), $wrap([])))).toBe(false);
        expect($await($equal($wrap([1]), $wrap([]), $wrap([])))).toBe(false);
      }),
    );
  });
});
