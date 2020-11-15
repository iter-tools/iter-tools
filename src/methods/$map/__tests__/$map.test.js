import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $map } from '../../..';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`map`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        const func = (value: any) => value * 2;
        expect($await($unwrap($map(func, null)))).toEqual([]);
        expect($await($unwrap($map(func, undefined)))).toEqual([]);
        expect($await($unwrap($map(func, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'returns func(value, i) for each value in source',
      $async(() => {
        expect($await($unwrap($map((value, i) => value + i, $wrap([1, 2, 3]))))).toEqual([1, 3, 5]);
      }),
    );
  });

  if ($isAsync) {
    it('can take an async func', async () => {
      expect(await $unwrap($map(async value => value * 2, $wrap([1, 2, 3])))).toEqual([2, 4, 6]);
    });
  }
});
