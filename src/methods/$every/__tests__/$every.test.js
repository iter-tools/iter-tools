import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $every } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`every`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($every(() => true, null))).toEqual(true);
        expect($await($every(() => true, undefined))).toEqual(true);
        expect($await($every(() => true, $wrap([])))).toEqual(true);
      }),
    );
  });

  describe('when no values match predicate', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($every(val => val !== val, [1, 2, 3]))).toBe(false);
      }),
    );
  });

  describe('when some values match predicate', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($every(val => val > 2, [1, 2, 3]))).toBe(false);
      }),
    );
  });

  describe('when every value matches predicate', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($every(val => val > 0, [1, 2, 3]))).toBe(true);
      }),
    );
  });

  if ($isAsync) {
    it('may take an async predicate', async () => {
      expect(await $every(async () => true, [1, 2, 3])).toBe(true);
    });
  }
});
