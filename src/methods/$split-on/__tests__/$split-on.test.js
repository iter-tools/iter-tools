import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitOn, $map, $toArray } from '../../..';

describe($`splitOn`, () => {
  it(
    'should split between every item which is equal to the on argument',
    $async(() => {
      expect(
        $await($toArray($map(group => $toArray(group), $splitOn(null, [1, null, 2, null, 3])))),
      ).toEqual([[1], [2], [3]]);
    }),
  );

  it(
    'should yield [] between two separators',
    $async(() => {
      expect(
        $await($toArray($map(group => $toArray(group), $splitOn(null, [1, null, null, 3])))),
      ).toEqual([[1], [], [3]]);
    }),
  );

  it(
    'should yield [], [] when only separator',
    $async(() => {
      expect($await($toArray($map(group => $toArray(group), $splitOn(null, [null]))))).toEqual([
        [],
        [],
      ]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($splitOn(0, null)))).toEqual([]);
    }),
  );

  if ($isSync) {
    it('passes through the empty string', () => {
      expect($toArray($splitOn(' ', ''))).toEqual([]);
    });

    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($splitOn('Ø', '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });
    });
  }
});
