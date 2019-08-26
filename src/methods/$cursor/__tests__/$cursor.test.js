import { $async, $await } from '../../../../generate/async.macro';
import { $cursor, $map, $toArray } from '../../..';

describe($async`cursor`, () => {
  it(
    'frames iterable',
    $async(() => {
      const iter = $cursor({ size: 3 }, [1, 2, 3, 4, 5]);
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
      const iter = $cursor({ size: 3, filler: 'x' }, [1, 2, 3, 4, 5]);
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
    'frames iterable (cursor equal to the sequence)',
    $async(() => {
      const iter = $cursor({ size: 5 }, [1, 2, 3, 4, 5]);
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
    'frames iterable (cursor bigger than the sequence)',
    $async(() => {
      const iter = $cursor({ size: 6 }, [1, 2, 3, 4, 5]);
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
    'frames iterable (cursor bigger than the sequence) with filler',
    $async(() => {
      const iter = $cursor({ size: 6, filler: 'x' }, [1, 2, 3, 4, 5]);
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
    'frames iterable (cursor bigger than the sequence)',
    $async(() => {
      const iter = $cursor({ size: 7 }, [1, 2, 3, 4, 5]);
      expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
        [undefined, undefined, undefined, undefined, undefined, undefined, 1],
        [undefined, undefined, undefined, undefined, undefined, 1, 2],
        [undefined, undefined, undefined, undefined, 1, 2, 3],
        [undefined, undefined, undefined, 1, 2, 3, 4],
        [undefined, undefined, 1, 2, 3, 4, 5],
      ]);
    }),
  );

  describe('trailing', () => {
    it(
      'frames iterable',
      $async(() => {
        const iter = $cursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3],
          [2, 3, 4],
          [3, 4, 5],
          [4, 5, undefined],
          [5, undefined, undefined],
        ]);
      }),
    );

    it(
      'frames iterable',
      $async(() => {
        const iter = $cursor({ size: 3, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3],
          [2, 3, 4],
          [3, 4, 5],
          [4, 5, 'x'],
          [5, 'x', 'x'],
        ]);
      }),
    );

    it(
      'frames iterable (cursor equal to the sequence)',
      $async(() => {
        const iter = $cursor({ size: 5, trailing: true }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3, 4, 5],
          [2, 3, 4, 5, undefined],
          [3, 4, 5, undefined, undefined],
          [4, 5, undefined, undefined, undefined],
          [5, undefined, undefined, undefined, undefined],
        ]);
      }),
    );

    it(
      'frames iterable (cursor bigger than the sequence)',
      $async(() => {
        const iter = $cursor({ size: 6, trailing: true }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3, 4, 5, undefined],
          [2, 3, 4, 5, undefined, undefined],
          [3, 4, 5, undefined, undefined, undefined],
          [4, 5, undefined, undefined, undefined, undefined],
          [5, undefined, undefined, undefined, undefined, undefined],
        ]);
      }),
    );

    it(
      'frames iterable (cursor bigger than the sequence) with filler',
      $async(() => {
        const iter = $cursor({ size: 6, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3, 4, 5, 'x'],
          [2, 3, 4, 5, 'x', 'x'],
          [3, 4, 5, 'x', 'x', 'x'],
          [4, 5, 'x', 'x', 'x', 'x'],
          [5, 'x', 'x', 'x', 'x', 'x'],
        ]);
      }),
    );

    it(
      'frames iterable (cursor bigger than the sequence) 2',
      $async(() => {
        const iter = $cursor({ size: 7, trailing: true }, [1, 2, 3, 4, 5]);
        expect($await($toArray($map(wndw => [...wndw], iter)))).toEqual([
          [1, 2, 3, 4, 5, undefined, undefined],
          [2, 3, 4, 5, undefined, undefined, undefined],
          [3, 4, 5, undefined, undefined, undefined, undefined],
          [4, 5, undefined, undefined, undefined, undefined, undefined],
          [5, undefined, undefined, undefined, undefined, undefined, undefined],
        ]);
      }),
    );
  });
});
