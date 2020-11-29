import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';
import { $awaitError } from '../../../../generate/test.macro.cjs';

import { $splitOn } from '@iter-tools/es';
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
