import { $, $isAsync, $async, $await, $Promise } from '../../../../generate/async.macro';

import { $Iterable } from '../../../types/$iterable';
import { $interleave, $InterleaveBuffer, $toArray } from '../../..';

describe($`interleave`, () => {
  const a = [1, 2, 3];
  const b = [4, 5, 6];
  const c = [7, 8, 9];

  it(
    'can be used to implement a round robin interleave',
    $async(() => {
      const roundRobin = $interleave(
        $async(function*(
          canTakeAny: () => $Promise<$InterleaveBuffer<number> | null>,
          a: $InterleaveBuffer<number>,
          b: $InterleaveBuffer<number>,
          c: $InterleaveBuffer<number>,
        ) {
          while ($await(canTakeAny())) {
            if ($await(a.canTake())) yield $await(a.take());
            if ($await(b.canTake())) yield $await(b.take());
            if ($await(c.canTake())) yield $await(c.take());
          }
        }),
      );

      expect($await($toArray(roundRobin(a, b, c)))).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
    }),
  );

  it(
    'can be passed options for the generator',
    $async(() => {
      const options = {};

      expect.assertions(1);
      $await(
        $toArray(
          $interleave(
            $async(function*(o: {}): $Iterable<any> {
              expect(o).toBe(options);
            }),
            options,
            null,
          ),
        ),
      );
    }),
  );

  if ($isAsync) {
    // see tests for interleaveReady which exercise this functionality
  } else {
    describe('the return value of canTakeAny', () => {
      it('can be used to do concatenation', () => {
        const concatenate = $interleave(function*(
          canTakeAny: () => $Promise<$InterleaveBuffer<number> | null>,
          _a: $InterleaveBuffer<number>,
          _b: $InterleaveBuffer<number>,
          _c: $InterleaveBuffer<number>,
        ) {
          let buffer = canTakeAny();

          while (buffer) {
            yield buffer.take();
            buffer = canTakeAny();
          }
        });

        expect(Array.from(concatenate(a, b, c))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });
  }
});
