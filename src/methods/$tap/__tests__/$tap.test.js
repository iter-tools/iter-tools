import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $tap } from '../../..';
import { $wrap, $unwrap, anyType } from '../../../test/$helpers';

describe($`tap`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        const func = jest.fn((value: any) => value * 2);
        expect($await($unwrap($tap(func, null)))).toEqual([]);
        expect($await($unwrap($tap(func, undefined)))).toEqual([]);
        expect($await($unwrap($tap(func, $wrap([]))))).toEqual([]);
        expect(func.mock.calls).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'returns func(value, i) for each value in source',
      $async(() => {
        const func: (value: number, i: number) => number = jest.fn((value, i) => value + i);
        expect($await($unwrap($tap(func, $wrap([1, 2, 3]))))).toEqual([1, 2, 3]);
        expect(anyType(func).mock.calls).toEqual([
          [1, 0],
          [2, 1],
          [3, 2],
        ]);
      }),
    );
  });

  if ($isAsync) {
    it('can take an async func', async () => {
      expect(await $unwrap($tap(async (value) => value * 2, $wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    });
  }
});
