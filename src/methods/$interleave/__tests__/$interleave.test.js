/* eslint-disable no-sequences */
import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $Iterable } from '../../../types/$iterable';
import { $interleave, $Peekerator, $toArray } from '../../..';

describe($`interleave`, () => {
  const a = [1, 2, 3];
  const b = [4, 5, 6];
  const c = [7, 8, 9];

  it(
    'can be used to implement a round robin interleave',
    $async(() => {
      const roundRobin = $interleave(
        $async(function*(
          options: Record<string, any>,
          all: $Peekerator<$Peekerator<number>>,
          a: $Peekerator<number>,
          b: $Peekerator<number>,
          c: $Peekerator<number>,
        ) {
          while (!all.done) {
            if (!a.done) {
              yield a.value;
              $await(a.advance());
            }
            if (!b.done) {
              yield b.value;
              $await(b.advance());
            }
            if (!c.done) {
              yield c.value;
              $await(c.advance());
            }
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
            $async(function*(o: Record<string, any>): $Iterable<any> {
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
    describe('the value of the summary', () => {
      it('can be used to do concatenation', () => {
        const concatenate = $interleave(
          $async(function*(_: Record<string, any>, all: $Peekerator<$Peekerator<number>>) {
            while (!all.done) {
              const buffer = all.value;
              yield buffer.value;
              $await(buffer.advance());
            }
          }),
        );

        expect(Array.from(concatenate(a, b, c))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });
  }
});
