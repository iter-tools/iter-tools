import { $async, $await } from '../../generate/async.macro';
import { $consume } from '..';

describe($async`consume`, () => {
  it(
    'consumes an iterable',
    $async(() => {
      const arr: Array<number> = [];
      $await($consume(item => arr.push(item), [1, 2, 3]));
      expect(arr).toEqual([1, 2, 3]);
    }),
  );

  it(
    'consumes an iterable using a promise',
    $async(() => {
      const arr: Array<number> = [];
      $await(
        $consume(
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
    'consumes an iterable (curried)',
    $async(() => {
      const arr: Array<number> = [];
      const consumePush = $consume(item => arr.push(item));
      $await(consumePush([1, 2, 3]));
      expect(arr).toEqual([1, 2, 3]);
    }),
  );
});
