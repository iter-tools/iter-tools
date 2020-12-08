import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $includesAny } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`includesAny`, () => {
  describe('when no values are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAny([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes a given value', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesAny([1], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAny([1, 2], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAny([2, 1], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAny([3, 2, 1], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAny([1, 2, 3], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable does not include a given value', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAny([-1, 0], $wrap([1, 2, 3])))).toBe(false);
        expect($await($includesAny([undefined, null], $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAny([undefined], $wrap([])))).toBe(false);
      }),
    );
  });

  if ($isSync) {
    describe('when iterable is a string', () => {
      it(
        'warns',
        $async(() => {
          $includesAny([], 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
