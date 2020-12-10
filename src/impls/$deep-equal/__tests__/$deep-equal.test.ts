import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $deepEqual, $__deepEqual } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`deepEqual`, () => {
  describe('when there is only one iterable', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($deepEqual(null))).toBe(true);
        expect($await($deepEqual(undefined))).toBe(true);
        expect($await($deepEqual($wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when all values are equal', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($deepEqual(4, 4, 4))).toBe(true);
        expect($await($deepEqual(NaN, NaN, NaN))).toBe(true);
      }),
    );
  });

  describe('when all values in all iterables are equal', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($deepEqual($wrap([]), $wrap([])))).toBe(true);
        expect($await($deepEqual(null, undefined))).toBe(true);
        expect($await($deepEqual(null, undefined, $wrap([])))).toBe(true);
        expect($await($deepEqual($wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
        expect($await($deepEqual($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when all values in some iterables are equal', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($deepEqual($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 4])))).toBe(
          false,
        );
        expect($await($deepEqual($wrap([1, 2, 3]), $wrap([1, 2, 4]), $wrap([1, 2, 3])))).toBe(
          false,
        );
        expect($await($deepEqual($wrap([1, 2, 4]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(
          false,
        );
      }),
    );
  });

  describe('when iterables have the same values but different lengths', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($deepEqual($wrap([1]), $wrap([1]), $wrap([1, 2])))).toBe(false);
        expect($await($deepEqual($wrap([1]), $wrap([1, 2]), $wrap([1])))).toBe(false);
        expect($await($deepEqual($wrap([1, 2]), $wrap([1]), $wrap([1])))).toBe(false);
        expect($await($deepEqual($wrap([]), $wrap([]), $wrap([1])))).toBe(false);
        expect($await($deepEqual($wrap([]), $wrap([1]), $wrap([])))).toBe(false);
        expect($await($deepEqual($wrap([1]), $wrap([]), $wrap([])))).toBe(false);
      }),
    );
  });
});

describe($`__deepEqual`, () => {
  const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);

  it(
    'uses same value to do comparison',
    $async(() => {
      expect($await($__deepEqual([$wrap([-1, -2, -3]), $wrap([1, 2, 3])], same))).toBe(true);
      expect($await($__deepEqual([$wrap([1, 2, 3]), $wrap([1, 2, 3])], () => false))).toBe(false);
    }),
  );

  describe('when coerceNil is false', () => {
    it(
      'can',
      $async(() => {
        expect($await($__deepEqual([null, undefined], Object.is, false))).toBe(false);
        expect($await($__deepEqual([null, $wrap([])], Object.is, false))).toBe(false);
      }),
    );
  });
});
