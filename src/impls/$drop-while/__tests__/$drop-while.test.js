import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $dropWhile } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`dropWhile`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($dropWhile((value: any) => value, null)))).toEqual([]);
        expect($await($unwrap($dropWhile((value: any) => value, undefined)))).toEqual([]);
        expect($await($unwrap($dropWhile((value: any) => value, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    describe('when no values match predicate', () => {
      it(
        'yields values from source',
        $async(() => {
          const iter = $dropWhile((i) => i !== i, $wrap([1, 2, 3, 4, 5, 6]));
          expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6]);
        }),
      );
    });

    describe('when all values match predicate', () => {
      it(
        'yields no values',
        $async(() => {
          const iter = $dropWhile((i) => i === i, $wrap([1, 2, 3, 4, 5, 6]));
          expect($await($unwrap(iter))).toEqual([]);
        }),
      );
    });

    describe('when a value matches predicate', () => {
      it(
        'yields the matching value and subsequent values',
        $async(() => {
          const iter = $dropWhile((i) => i !== 4, $wrap([1, 2, 3, 4, 5, 6]));
          expect($await($unwrap(iter))).toEqual([4, 5, 6]);
        }),
      );
    });
  });

  if ($isAsync) {
    it('may take an async predicate', async () => {
      const iter = $dropWhile(async (i) => i !== 4, $wrap([1, 2, 3, 4, 5, 6]));
      expect(await $unwrap(iter)).toEqual([4, 5, 6]);
    });
  }
});
