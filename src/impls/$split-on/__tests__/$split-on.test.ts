import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';
import { $awaitError } from '../../../../generate/test.macro.cjs';

import { $splitOn } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`splitOn`, () => {
  it(
    'should split between every value which is equal to the on argument',
    $async(() => {
      expect($await($unwrapDeep($splitOn(null, $wrap([1, null, 2, null, 3]))))).toEqual([
        [1],
        [2],
        [3],
      ]);
    }),
  );

  it(
    'should throw when splits are consumed out of order',
    $async(() => {
      const parts = $splitOn(null, $wrap([1, null, 2]));
      const a = $await(parts.next()).value;
      const b = $await(parts.next()).value;

      expect($awaitError($unwrapDeep([b, a]))).toMatchSnapshot();
    }),
  );

  it(
    'should yield [] between two separators',
    $async(() => {
      expect($await($unwrapDeep($splitOn(null, $wrap([1, null, null, 3]))))).toEqual([
        [1],
        [],
        [3],
      ]);
    }),
  );

  it(
    'should yield [], [] when only separator',
    $async(() => {
      expect($await($unwrapDeep($splitOn(null, $wrap([null]))))).toEqual([[], []]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrapDeep($splitOn(0, null)))).toEqual([]);
    }),
  );

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it(
      'uses same value to do comparison',
      $async(() => {
        expect($await($unwrapDeep($splitOn(same, 2, $wrap([1, 2, 3]))))).toEqual([[1], [3]]);
        expect($await($unwrapDeep($splitOn(() => false, 2, $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
      }),
    );
  });

  if ($isSync) {
    describe('when source is a string', () => {
      it(
        'warns',
        $async(() => {
          $splitOn(null, 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
