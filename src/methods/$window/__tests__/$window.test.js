import { $, $async, $await } from '../../../../generate/async.macro';

import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $window } from '../../..';

describe($`window`, () => {
  it(
    'frames iterable',
    $async(() => {
      const result = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

      expect($await($uw($window(3, [1, 2, 3, 4, 5])))).toEqual(result);
    }),
  );

  it(
    'frames iterable (window equal to the sequence)',
    $async(() => {
      expect($await($uw($window(5, [1, 2, 3, 4, 5])))).toEqual([[1, 2, 3, 4, 5]]);
    }),
  );

  describe('when the dinwos is bigger than the sequence', () => {
    it(
      'frames iterable (window bigger than the sequence)',
      $async(() => {
        expect($await($uw($window(6, [1, 2, 3, 4, 5])))).toEqual([]);
      }),
    );

    it(
      'frames iterable (window bigger than the sequence) with filler',
      $async(() => {
        expect($await($uw($window(6, [1, 2, 3, 4, 5])))).toEqual([]);
      }),
    );
  });

  describe('invalid inputs', () => {
    it('throw', () => {
      const size: any = 'a';
      size;
      expect(() => $window(size, [])).toThrowErrorMatchingSnapshot();
    });
  });
});
