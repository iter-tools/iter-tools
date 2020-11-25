import { $, $async, $await } from '../../../../generate/async.macro';

import { $zipAll, $toArray } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`zipAll`, () => {
  describe('when sources are of equal length', () => {
    it(
      'yields all values',
      $async(() => {
        const iter = $zipAll($wrap([1, 2, 3]), $wrap([4, 5, 6]), $wrap([7, 8, 9]));
        expect($await($toArray(iter))).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9],
        ]);
      }),
    );
  });

  describe('when some iterables are shorter than others', () => {
    describe('when filler is specified', () => {
      it(
        'fills with filler',
        $async(() => {
          const iter = $zipAll({ filler: null }, $wrap([1, 2, 3]), $wrap([4, 5]), $wrap([7, 8]));
          expect($await($toArray(iter))).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, null, null],
          ]);
        }),
      );
    });

    describe('when filler is not specified', () => {
      it(
        'fills with undefined',
        $async(() => {
          const iter = $zipAll($wrap([1, 2, 3]), $wrap([4, 5]), $wrap([7, 8]));
          expect($await($toArray(iter))).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, undefined, undefined],
          ]);
        }),
      );
    });
  });
});
