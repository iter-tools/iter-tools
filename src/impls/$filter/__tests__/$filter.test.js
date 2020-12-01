import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $filter } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`filter`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        const pred = (v: any) => v;
        expect($await($unwrap($filter(pred, null)))).toEqual([]);
        expect($await($unwrap($filter(pred, undefined)))).toEqual([]);
        expect($await($unwrap($filter(pred, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields values for which predicate(value, i) returns true',
      $async(() => {
        expect(
          $await($unwrap($filter((value, i) => value === i, $wrap([1, 1, 2, 3, 5, 8])))),
        ).toEqual([1, 2, 3]);
      }),
    );
  });

  if ($isAsync) {
    it('may take an async predicate', async () => {
      const iter = $filter(async (value) => value % 2 === 0, $wrap([1, 2, 3, 4, 5, 6]));
      expect(await $unwrap(iter)).toEqual([2, 4, 6]);
    });
  }
});
