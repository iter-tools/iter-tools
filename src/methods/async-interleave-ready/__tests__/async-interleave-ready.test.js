import { asyncInterleaveReady, asyncToArray } from '../../..';

import delay from '../../../internal/delay';

describe('asyncInterleaveReady', () => {
  it('can use the return value of canTakeAny to interleave by promise readiness', async () => {
    const a = (async function* () {
      await delay(10);
      yield 1;
      await delay(30);
      yield 2;
    })();

    const b = (async function* () {
      await delay(20);
      yield 3;
      await delay(10);
      yield 4;
    })();

    expect(await asyncToArray(asyncInterleaveReady(a, b))).toEqual([1, 3, 4, 2]);
  });
});
