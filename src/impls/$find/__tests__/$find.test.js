import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $find } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`find`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($find((item: any) => item, null))).toBe(undefined);
        expect($await($find((item: any) => item, undefined))).toBe(undefined);
        expect($await($find((item: any) => item, $wrap([])))).toBe(undefined);
      }),
    );
  });

  describe('when iterable does not contain the desired value', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($find((_) => false, $wrap([1, 2, 3, 4, 5, 6])))).toBe(undefined);
      }),
    );
  });

  describe('when iterable contains the desired value', () => {
    it(
      'returns the value',
      $async(() => {
        expect($await($find((item) => item === 5, $wrap([1, 2, 3, 4, 5, 6])))).toBe(5);
      }),
    );
  });

  if ($isAsync) {
    it('may take an async predicate', async () => {
      expect(await $find(async (item) => item === 5, $wrap([1, 2, 3, 4, 5, 6]))).toBe(5);
    });
  }
});
