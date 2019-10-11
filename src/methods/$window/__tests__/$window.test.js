import { $, $async, $await } from '../../../../generate/async.macro';

import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $window } from '../../..';

describe($`window`, () => {
  it(
    'frames iterable',
    $async(() => {
      const result = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, undefined],
        [5, undefined, undefined],
      ];

      expect($await($uw($window(3, [1, 2, 3, 4, 5])))).toEqual(result);
      const opts: any = { size: 3 };
      opts;
      expect($await($uw($window(opts, [1, 2, 3, 4, 5])))).toEqual(result);
    }),
  );

  it(
    'frames iterable',
    $async(() => {
      const result = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 'x'], [5, 'x', 'x']];

      expect($await($uw($window(3, { filler: 'x' }, [1, 2, 3, 4, 5])))).toEqual(result);
      const opts: any = { size: 3, filler: 'x' };
      opts;
      expect($await($uw($window(opts, [1, 2, 3, 4, 5])))).toEqual(result);
    }),
  );

  it(
    'can have separate size and options arguments',
    $async(() => {
      expect($await($uw($window(3, { filler: 'x' }, [1, 2, 3, 4, 5])))).toEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 'x'],
        [5, 'x', 'x'],
      ]);
    }),
  );

  it(
    'frames iterable (window equal to the sequence)',
    $async(() => {
      expect($await($uw($window(5, [1, 2, 3, 4, 5])))).toEqual([
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, undefined],
        [3, 4, 5, undefined, undefined],
        [4, 5, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence)',
    $async(() => {
      expect($await($uw($window(6, [1, 2, 3, 4, 5])))).toEqual([
        [1, 2, 3, 4, 5, undefined],
        [2, 3, 4, 5, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence) with filler',
    $async(() => {
      expect($await($uw($window(6, { filler: 'x' }, [1, 2, 3, 4, 5])))).toEqual([
        [1, 2, 3, 4, 5, 'x'],
        [2, 3, 4, 5, 'x', 'x'],
        [3, 4, 5, 'x', 'x', 'x'],
        [4, 5, 'x', 'x', 'x', 'x'],
        [5, 'x', 'x', 'x', 'x', 'x'],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence) 2',
    $async(() => {
      expect($await($uw($window(7, [1, 2, 3, 4, 5])))).toEqual([
        [1, 2, 3, 4, 5, undefined, undefined],
        [2, 3, 4, 5, undefined, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined, undefined],
      ]);
    }),
  );
});
