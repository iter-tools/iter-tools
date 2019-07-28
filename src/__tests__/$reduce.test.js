import { $Promise, $InputIterable } from '../internal/$iterable';
import { $isAsync, $async, $await } from '../../generate/async.macro';
import { $reduce, asyncReduce, reduce, range } from '..';
import { $OneTwoThreeIterable } from './__framework__/fixtures';

describe($async`reduce`, () => {
  it(
    'sums an array',
    $async(() => {
      expect($await($reduce((acc = 0, x) => acc + x, [0, 1, 2, 3]))).toBe(6);
    }),
  );

  it(
    'sums a range',
    $async(() => {
      expect($await($reduce((acc = 0, x) => acc + x, range(4)))).toBe(6);
    }),
  );

  it(
    'sums using a specified initial value',
    $async(() => {
      expect($await($reduce(1, (acc, x) => acc + x, range(4)))).toBe(7);
    }),
  );

  it(
    'sums using the initial value as the initial value',
    $async(() => {
      expect($await($reduce((acc, x) => acc + x, range({ start: 2, end: 4 })))).toBe(5);
    }),
  );

  it(
    'returns specified initial value when iterable is empty',
    $async(() => {
      expect($await($reduce(0, (acc, x) => acc + x, []))).toBe(0);
    }),
  );

  it(
    'throws when no initial value specified and iterable is empty',
    $async(() => {
      if ($isAsync) {
        let error;
        try {
          $await(asyncReduce((acc, x) => acc + x, []));
        } catch (e) {
          error = e;
        }

        expect(error).toBeInstanceOf(Error);
      } else {
        expect(() => {
          reduce((acc, x) => acc + x, []);
        }).toThrow();
      }
    }),
  );

  it(
    'sums a range (using curry)',
    $async(() => {
      const sum: (iterable: $InputIterable<number>) => $Promise<number> = $reduce(
        (acc = 0, x) => acc + x,
      );
      expect($await(sum(range(4)))).toBe(6);
    }),
  );

  it(
    'cleans up iterable',
    $async(() => {
      const oneTwoThree = new $OneTwoThreeIterable();
      try {
        $await(
          $reduce((acc = 0, x) => {
            throw new Error('ops');
          }, oneTwoThree),
        );
      } catch (e) {
        expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
      }
    }),
  );
});
