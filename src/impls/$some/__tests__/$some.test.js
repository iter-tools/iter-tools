import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $some } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`some`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($some(() => true, null))).toEqual(false);
        expect($await($some(() => true, undefined))).toEqual(false);
        expect($await($some(() => true, $wrap([])))).toEqual(false);
      }),
    );
  });

  describe('when no values match predicate', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($some((val) => val !== val, [1, 2, 3]))).toBe(false);
      }),
    );
  });

  describe('when some values match predicate', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($some((val) => val > 2, [1, 2, 3]))).toBe(true);
      }),
    );
  });

  describe('when all values match predicate', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($some((val) => val > 0, [1, 2, 3]))).toBe(true);
      }),
    );
  });

  if ($isAsync) {
    it('can be passed an async predicate', async () => {
      expect(await $some(async (n) => n % 2 === 0, [1, 2, 3, 4, 5, 6])).toBe(true);
    });
  }
});
