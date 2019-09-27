import { $async, $await } from '../../../../generate/async.macro';
import { $trailingWindow, $map, $toArray } from '../../..';

describe($async`trailingWindow`, () => {
  it(
    'frames iterable',
    $async(() => {
      const iter = $trailingWindow({ size: 3 }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
        [undefined, undefined, 1],
        [undefined, 1, 2],
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ]);
    }),
  );

  it(
    'frames iterable (use filler)',
    $async(() => {
      const iter = $trailingWindow({ size: 3, filler: 'x' }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
        ['x', 'x', 1],
        ['x', 1, 2],
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ]);
    }),
  );

  it(
    'frames iterable (window equal to the sequence)',
    $async(() => {
      const iter = $trailingWindow({ size: 5 }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
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
      const iter = $trailingWindow({ size: 6 }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
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
      const iter = $trailingWindow({ size: 6, filler: 'x' }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
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
      const iter = $trailingWindow({ size: 7 }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
        [undefined, undefined, undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, undefined, undefined, undefined, 1, 2],
        [undefined, undefined, undefined, undefined, 1, 2, 3],
        [undefined, undefined, undefined, 1, 2, 3, 4],
        [undefined, undefined, 1, 2, 3, 4, 5],
      ]);
    }),
  );
});
