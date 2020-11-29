import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $findOr } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`findOr`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns notFoundValue',
      $async(() => {
        expect($await($findOr(0, (value: any) => value, null))).toBe(0);
        expect($await($findOr(0, (value: any) => value, undefined))).toBe(0);
        expect($await($findOr(0, (value: any) => value, $wrap([])))).toBe(0);
      }),
    );
  });

  describe('when iterable does not contain the desired value', () => {
    it(
      'returns notFoundValue',
      $async(() => {
        expect($await($findOr(0, (_) => false, $wrap([1, 2, 3, 4, 5, 6])))).toBe(0);
      }),
    );
  });

  describe('when iterable contains the desired value', () => {
    it(
      'returns the value',
      $async(() => {
        expect($await($findOr(0, (value) => value === 5, $wrap([1, 2, 3, 4, 5, 6])))).toBe(5);
      }),
    );
  });

  if ($isAsync) {
    it('may take an async predicate', async () => {
      expect(await $findOr(0, async (value) => value === 5, $wrap([1, 2, 3, 4, 5, 6]))).toBe(5);
    });
  }
});
