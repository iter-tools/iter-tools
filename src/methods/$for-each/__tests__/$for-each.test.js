import { $, $async, $await } from '../../../../generate/async.macro';

import { $forEach } from '../../..';

describe($`forEach`, () => {
  it(
    'iterates over an iterable',
    $async(() => {
      const arr: Array<number> = [];
      $await($forEach(item => arr.push(item), [1, 2, 3]));
      expect(arr).toEqual([1, 2, 3]);
    }),
  );

  it(
    'iterates over an iterable using a promise',
    $async(() => {
      const arr: Array<number> = [];
      $await(
        $forEach(
          item => {
            arr.push(item);
            return Promise.resolve(0);
          },
          [1, 2, 3],
        ),
      );
      expect(arr).toEqual([1, 2, 3]);
    }),
  );

  it(
    'iterates over an iterable (curried)',
    $async(() => {
      const arr: Array<number> = [];
      const forEachPush = $forEach((item: number) => arr.push(item));
      $await(forEachPush([1, 2, 3]));
      expect(arr).toEqual([1, 2, 3]);
    }),
  );
});
