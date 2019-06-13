import { $isAsync, $async, $await } from '../../generate/async.macro';
import { $every, asyncEvery } from '..';

describe($async`every`, () => {
  it(
    'returns true if all items is true',
    $async(() => {
      expect($await($every(n => n % 2 === 0, [4, 2, 6, 4, 8, 6]))).toBe(true);
    }),
  );

  it(
    'returns false if at least one item is false',
    $async(() => {
      expect($await($every(n => n % 2 === 0, [4, 1, 6, 4, 8, 6]))).toBe(false);
    }),
  );

  it(
    'returns true if there are no items',
    $async(() => {
      expect($await($every(n => n % 2 === 0, null))).toBe(true);
    }),
  );

  if ($isAsync) {
    it('returns true if all items are true (using a promise)', async () => {
      expect(await asyncEvery(n => Promise.resolve(n % 2 === 0), [4, 2, 6, 4, 8, 6])).toBe(true);
    });
  }
});
