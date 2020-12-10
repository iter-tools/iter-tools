import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $splitOnAny } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`splitOnAny`, () => {
  it(
    'should split on an occurance of any value',
    $async(() => {
      expect(
        $await($unwrapDeep($splitOnAny([null, undefined], $wrap([1, null, undefined, 3])))),
      ).toEqual([[1], [], [3]]);
    }),
  );

  it(
    'does not split when passed no values',
    $async(() => {
      expect($await($unwrapDeep($splitOnAny([], $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrapDeep($splitOnAny([], null)))).toEqual([]);
    }),
  );

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it(
      'uses same value to do comparison',
      $async(() => {
        expect($await($unwrapDeep($splitOnAny(same, [2], $wrap([1, 2, 3]))))).toEqual([[1], [3]]);
        expect($await($unwrapDeep($splitOnAny(() => false, [2], $wrap([1, 2, 3]))))).toEqual([
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
          $splitOnAny([], 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
