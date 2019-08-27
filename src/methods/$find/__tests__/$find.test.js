import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $find, asyncFind, range } from '../../..';

describe($async`find`, () => {
  it(
    'returns found item',
    $async(() => {
      const found = $find(item => item === 5, [1, 2, 3, 4, 5, 6]);
      expect($await(found)).toBe(5);
    }),
  );

  it(
    'returns undefined if no item found',
    $async(() => {
      const found = $find(_ => false, [1, 2, 3, 4, 5, 6]);
      expect($await(found)).toBe(undefined);
    }),
  );

  it(
    'returns notFoundValue if specified and no item found',
    $async(() => {
      const found = $find(0, _ => false, [1, 2, 3, 4, 5, 6]);
      expect($await(found)).toBe(0);
    }),
  );

  it(
    'returns found item from iterable',
    $async(() => {
      const found = $find(item => item === 5, range({ start: 1, end: 7 }));
      expect($await(found)).toBe(5);
    }),
  );

  it(
    'returns undefined if no item found from iterable',
    $async(() => {
      const found = $find(item => item === 100, range({ start: 1, end: 7 }));
      expect($await(found)).toBe(undefined);
    }),
  );

  it(
    'returns filtered iterable (curried version)',
    $async(() => {
      const findFive = $find(item => item === 5);
      expect($await(findFive(range({ start: 1, end: 7 })))).toBe(5);
    }),
  );

  it(
    'returns undefined if passed null',
    $async(() => {
      const found = $find(item => item, null);
      expect($await(found)).toBe(undefined);
    }),
  );

  if ($isAsync) {
    it('returns found item (using a promise)', async () => {
      const found = asyncFind(async item => item === 5, [1, 2, 3, 4, 5, 6]);
      expect(await found).toBe(5);
    });
  }
});
