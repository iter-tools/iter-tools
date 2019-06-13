import { $IterableIterator } from '../internal/$iterable';
import { $async, $await } from '../../generate/async.macro';
import { $multiPartition, $map, $toArray, range, slice } from '..';
import { $OneTwoThreeIterable } from './__framework__/fixtures';

describe($async`multiPartition`, () => {
  const allToArray = (...args: Array<$IterableIterator<number>>) => $toArray($map($toArray, args));
  const func = (x: number) => x % 4;

  it(
    'empty iterable',
    $async(() => {
      const [a, b, c, d] = $multiPartition(func, []);
      expect($await(allToArray(a, b, c, d))).toEqual(Array(4).fill([]));
    }),
  );

  it(
    'range(16)',
    $async(() => {
      const [a, b, c, d] = $multiPartition(func, range(16));
      expect($await(allToArray(a, b, c, d))).toEqual([
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
      ]);
    }),
  );

  it(
    'range(16) unsorted',
    $async(() => {
      const [a, b, c, d] = $multiPartition(func, [
        10,
        9,
        2,
        5,
        0,
        12,
        3,
        6,
        8,
        7,
        14,
        13,
        15,
        11,
        4,
        1,
      ]);
      expect($await(allToArray(a, b, c, d))).toEqual([
        [0, 12, 8, 4],
        [9, 5, 13, 1],
        [10, 2, 6, 14],
        [3, 7, 15, 11],
      ]);
    }),
  );

  it(
    'out-of-bound access returns empty iterables',
    $async(() => {
      const iv = $await($toArray(slice({ start: 6, end: 8 }, $multiPartition(func, range(16)))));
      expect($await(allToArray(...iv))).toEqual([[], []]);
    }),
  );

  it(
    'cleans up the iterable',
    $async(() => {
      const oneTwoThree = new $OneTwoThreeIterable();
      const [a, b] = $multiPartition(x => x - 1, oneTwoThree);
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
      $await(a.next());
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
      $await($toArray(b)); // exhausting a single partition will clean-up the original iterable
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
    }),
  );
});
