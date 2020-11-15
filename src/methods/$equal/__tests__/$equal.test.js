import { $, $async, $await } from '../../../../generate/async.macro';

import { $equal } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`equal`, () => {
  describe('when there is only one iterable', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($equal(null))).toEqual(true);
        expect($await($equal(undefined))).toEqual(true);
        expect($await($equal($wrap([1, 2, 3])))).toEqual(true);
      }),
    );
  });

  describe('when all values in all iterables are equal', () => {
    it(
      'returns true if all contents are equal',
      $async(() => {
        expect($await($equal($wrap([]), $wrap([])))).toEqual(true);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3])))).toEqual(true);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toEqual(true);
      }),
    );
  });

  describe('when all values in some iterables are equal', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 4])))).toEqual(false);
        expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 4]), $wrap([1, 2, 3])))).toEqual(false);
        expect($await($equal($wrap([1, 2, 4]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toEqual(false);
      }),
    );
  });

  describe('when iterables have the same values but different lengths', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($equal($wrap([1]), $wrap([1]), $wrap([1, 2])))).toEqual(false);
        expect($await($equal($wrap([1]), $wrap([1, 2]), $wrap([1])))).toEqual(false);
        expect($await($equal($wrap([1, 2]), $wrap([1]), $wrap([1])))).toEqual(false);
        expect($await($equal($wrap([]), $wrap([]), $wrap([1])))).toEqual(false);
        expect($await($equal($wrap([]), $wrap([1]), $wrap([])))).toEqual(false);
        expect($await($equal($wrap([1]), $wrap([]), $wrap([])))).toEqual(false);
      }),
    );
  });
});
