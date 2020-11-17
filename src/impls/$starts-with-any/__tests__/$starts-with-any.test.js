import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $startsWithAny } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`startsWithAny`, () => {
  describe('when no values are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAny([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable starts with a given value', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithAny([1], $wrap([1, 2, 3])))).toBe(true);
        expect($await($startsWithAny([2, 1], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable does not start with with a given value', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAny([2], $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAny([null], $wrap([])))).toBe(false);
      }),
    );
  });

  if ($isSync) {
    describe('when iterable is a string', () => {
      it(
        'warns',
        $async(() => {
          $startsWithAny([], 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
