import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $findOr } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`findOr`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns notFoundValue',
      $async(() => {
        expect($await($findOr(0, (item: never) => item, null))).toBe(0);
        expect($await($findOr(0, (item: never) => item, undefined))).toBe(0);
        expect($await($findOr(0, (item: never) => item, $wrap([])))).toBe(0);
      }),
    );
  });

  describe('when iterable does not contain the desired value', () => {
    it(
      'returns notFoundValue',
      $async(() => {
        expect($await($findOr(0, _ => false, $wrap([1, 2, 3, 4, 5, 6])))).toBe(0);
      }),
    );
  });

  describe('when iterable contains the desired value', () => {
    it(
      'returns the value',
      $async(() => {
        expect($await($findOr(0, item => item === 5, $wrap([1, 2, 3, 4, 5, 6])))).toBe(5);
      }),
    );

    if ($isAsync) {
      it('the predicate may return a promise', async () => {
        expect(await $findOr(0, async item => item === 5, $wrap([1, 2, 3, 4, 5, 6]))).toBe(5);
      });
    }
  });
});
