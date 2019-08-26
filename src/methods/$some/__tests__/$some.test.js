import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $some, asyncSome } from '../../..';

describe($async`some`, () => {
  it(
    'returns true if at least one item is true',
    $async(() => {
      expect($await($some(n => n % 2 === 0, [1, 2, 3, 4, 5, 6]))).toBe(true);
    }),
  );

  it(
    'returns false if all items are false',
    $async(() => {
      expect($await($some(n => n % 2 === 0, [1, 3, 3, 7, 5, 1]))).toBe(false);
    }),
  );

  it(
    'returns false if there are no items',
    $async(() => {
      expect($await($some(n => n % 2 === 0, null))).toBe(false);
    }),
  );

  if ($isAsync) {
    it('returns true if at least one item is true (using a promise)', async () => {
      expect(await asyncSome(n => Promise.resolve(n % 2 === 0), [1, 2, 3, 4, 5, 6])).toBe(true);
    });
  }
});
