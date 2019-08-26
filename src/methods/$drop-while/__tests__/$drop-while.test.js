import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $dropWhile, asyncDropWhile, $toArray, asyncToArray, range } from '../../..';

describe($async`dropWhile`, () => {
  it(
    'dropWhile on array',
    $async(() => {
      const iter = $dropWhile(item => item % 2 === 0, [2, 2, 3, 2, 2, 2]);
      expect($await($toArray(iter))).toEqual([3, 2, 2, 2]);
    }),
  );

  it(
    'dropWhile on iterable',
    $async(() => {
      const iter = $dropWhile(item => item !== 4, range({ start: 1, end: 7 }));
      expect($await($toArray(iter))).toEqual([4, 5, 6]);
    }),
  );

  it(
    'dropWhile on iterable (curried version)',
    $async(() => {
      const iter = $dropWhile(item => item !== 4);
      expect($await($toArray(iter(range({ start: 1, end: 7 }))))).toEqual([4, 5, 6]);
    }),
  );

  it(
    'dropWhile on null',
    $async(() => {
      expect($await($toArray($dropWhile((item: any) => item, null)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it('dropWhile on iterable (using a promise)', async () => {
      const iter = asyncDropWhile(item => Promise.resolve(item !== 4), range({ start: 1, end: 7 }));
      expect(await asyncToArray(iter)).toEqual([4, 5, 6]);
    });
  }
});
