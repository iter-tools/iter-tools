import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $split, $map, $toArray } from '../../..';

describe($`split`, () => {
  it(
    'should yield an iterable for every item in the iterable',
    $async(() => {
      expect($await($toArray($map(group => $toArray(group), $split([1, 2, 3]))))).toEqual([
        [1],
        [2],
        [3],
      ]);
    }),
  );

  if ($isSync) {
    it('exploding a string should return the string', () => {
      expect($split('123')).toEqual('123');
    });
  }
});
