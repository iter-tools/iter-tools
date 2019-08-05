import { $async, $await } from '../../generate/async.macro';
import { $zipAll, $toArray, $slice, range } from '..';
import { $OneTwoThreeIterable } from './__framework__/fixtures';

describe($async`zipAll`, () => {
  it(
    'zips',
    $async(() => {
      const iter = $zipAll([1, 2, 3], [4, 5, 6], [7, 8, 9]);
      expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
    }),
  );

  it(
    'zips using iterables',
    $async(() => {
      const iter = $zipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9]);
      expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
    }),
  );

  it(
    'zip stopping early',
    $async(() => {
      const iter = $zipAll(range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8]);
      expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, undefined, undefined]]);
    }),
  );

  it(
    'closes when stopping earlier',
    $async(() => {
      // broken if transpiled with es5 loose
      const $oneTwoThree = new $OneTwoThreeIterable();
      const iter = $slice(0, 2, $zipAll(range(2), $oneTwoThree));
      expect($await($toArray(iter))).toEqual([[0, 1], [1, 2]]);
      expect($oneTwoThree).toHaveProperty('isCleanedUp', true);
    }),
  );
});
