import { asyncInterleaveReady, asyncToArray } from '../../..';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('asyncInterleaveReady', () => {
  it('can use the return value of canTakeAny to interleave by promise readiness', async () => {
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

    expect(await asyncToArray(asyncInterleaveReady(a, b))).toEqual([1, 3, 4, 2]);
  });
});
