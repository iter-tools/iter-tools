import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $takeWhile } from '../../..';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`takeWhile`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($takeWhile((value: any) => value, null)))).toEqual([]);
        expect($await($unwrap($takeWhile((value: any) => value, undefined)))).toEqual([]);
        expect($await($unwrap($takeWhile((value: any) => value, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields values while the result of predicate(value, i) is truthy',
      $async(() => {
        expect($await($unwrap($takeWhile(value => value === 2, $wrap([2, 2, 3, 2]))))).toEqual([
          2,
          2,
        ]);
        expect($await($unwrap($takeWhile((_value, i) => i < 0, $wrap([2, 2]))))).toEqual([]);
      }),
    );
  });

  if ($isAsync) {
    it('can take an async predicate', async () => {
      const iter = $takeWhile(async value => value % 2 === 0, [2, 2, 3, 2, 2, 2]);
      expect(await $unwrap(iter)).toEqual([2, 2]);
    });
  }
});
