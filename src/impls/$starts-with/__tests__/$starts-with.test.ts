import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $startsWith } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`startsWith`, () => {
  describe('when iterable starts with value', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWith(1, $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable does not start with with value', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWith(2, $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWith(null, $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it(
      'uses same value to do comparison',
      $async(() => {
        expect($await($startsWith(same, -1, $wrap([1, 2, 3])))).toBe(true);
        expect($await($startsWith(() => false, 1, $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  if ($isSync) {
    describe('when iterable is a string', () => {
      it(
        'warns',
        $async(() => {
          $startsWith([], 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
