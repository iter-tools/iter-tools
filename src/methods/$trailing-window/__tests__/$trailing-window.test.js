import { $, $async, $await } from '../../../../generate/async.macro';

import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $trailingWindow } from '../../..';

describe($`trailingWindow`, () => {
  const _12345 = Object.freeze([1, 2, 3, 4, 5]);

  it(
    'frames iterable',
    $async(() => {
      const result = [
        [undefined, undefined, 1],
        [undefined, 1, 2],
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ];

      expect($await($uw($trailingWindow(3, _12345)))).toEqual(result);
      const opts: any = { size: 3 };
      opts;
      expect($await($uw($trailingWindow(opts, _12345)))).toEqual(result);
    }),
  );

  it(
    'frames iterable (use filler)',
    $async(() => {
      const result = [['x', 'x', 1], ['x', 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5]];

      expect($await($uw($trailingWindow(3, { filler: 'x' }, _12345)))).toEqual(result);
      const opts: any = { size: 3, filler: 'x' };
      opts;
      expect($await($uw($trailingWindow(opts, _12345)))).toEqual(result);
    }),
  );

  it(
    'frames iterable (window equal to the sequence)',
    $async(() => {
      expect($await($uw($trailingWindow(5, _12345)))).toEqual([
        [undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, undefined, 1, 2],
        [undefined, undefined, 1, 2, 3],
        [undefined, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence)',
    $async(() => {
      expect($await($uw($trailingWindow(6, _12345)))).toEqual([
        [undefined, undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, undefined, undefined, 1, 2],
        [undefined, undefined, undefined, 1, 2, 3],
        [undefined, undefined, 1, 2, 3, 4],
        [undefined, 1, 2, 3, 4, 5],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence) with filler',
    $async(() => {
      expect($await($uw($trailingWindow(6, { filler: 'x' }, _12345)))).toEqual([
        ['x', 'x', 'x', 'x', 'x', 1],
        ['x', 'x', 'x', 'x', 1, 2],
        ['x', 'x', 'x', 1, 2, 3],
        ['x', 'x', 1, 2, 3, 4],
        ['x', 1, 2, 3, 4, 5],
      ]);
    }),
  );

  it(
    'frames iterable (window bigger than the sequence)',
    $async(() => {
      expect($await($uw($trailingWindow(7, [1, 2, 3, 4, 5])))).toEqual([
        [undefined, undefined, undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, undefined, undefined, undefined, 1, 2],
        [undefined, undefined, undefined, undefined, 1, 2, 3],
        [undefined, undefined, undefined, 1, 2, 3, 4],
        [undefined, undefined, 1, 2, 3, 4, 5],
      ]);
    }),
  );
});
