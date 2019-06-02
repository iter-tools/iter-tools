import { $isAsync, $async, $await } from '../../generate/async.macro';
import { $Promise } from '../internal/$iterable';
import $InterleaveBuffer from '../internal/interleave/$buffer';
import { $interleave, interleave, asyncInterleave, $toArray, asyncToArray } from '..';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const $methodName = $isAsync ? 'asyncInterleave' : 'interleave';

describe($methodName, () => {
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

  if ($isAsync) {
    it('can use the return value of canTakeAny to interleave by promise readiness', async () => {
      const interleaveReady = asyncInterleave(async function*(canTakeAny) {
        let buffer = await canTakeAny();

        while (buffer) {
          yield await buffer.take();
          buffer = await canTakeAny();
        }
      });

      const a = (async function*() {
        await wait(10);
        yield 1;
        await wait(30);
        yield 2;
      })();

      const b = (async function*() {
        await wait(20);
        yield 3;
        await wait(10);
        yield 4;
      })();

      expect(await asyncToArray(interleaveReady(a, b))).toEqual([1, 3, 4, 2]);
    });
  } else {
    it('can use the return value of canTakeAny to do concatenation', () => {
      const concatenate = interleave(function*(
        canTakeAny: () => $Promise<$InterleaveBuffer<number> | null>,
        a: $InterleaveBuffer<number>,
        b: $InterleaveBuffer<number>,
        c: $InterleaveBuffer<number>,
      ) {
        let buffer = canTakeAny();

        while (buffer) {
          yield buffer.take();
          buffer = canTakeAny();
        }
      });

      expect(Array.from(concatenate(a, b, c))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  }
});
